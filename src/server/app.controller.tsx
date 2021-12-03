import { Controller, Get, Req, Res } from '@nestjs/common';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { Helmet } from 'react-helmet';
import { join } from 'path';

import { initRouter, RoutesConfiguration } from 'src/common/initRouter';
import { parseManifest } from 'src/common/formats/manifest';
import { configureRoutes } from 'src/pages/routes';
import { initApplication } from '../pages';

const manifestPath = join(process.cwd(), 'public', 'assets-manifest.json');
const manifestJson = require(manifestPath);
const manifest = parseManifest(manifestJson); // TODO: убрать в модуль

const routesConfig = new RoutesConfiguration();
configureRoutes(routesConfig);

@Controller('*') // TODO: починить звездочку
export class AppController {
    constructor() { }

    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        // https://router5.js.org/advanced/universal-routing#server-side-routing
        const router = initRouter(routesConfig); // TODO: передавать basePath из конфига

        router.start(req.originalUrl, async function done(error, state) {
            if (error) {
                res.status(404); // TODO: проверять код ошибки, чтобы выбрать код 404 или 500
            }

            // предзагружаем страничный компонент
            await routesConfig.loadComponent(state);

            const application = initApplication(router, routesConfig);

            const html = renderToString(application);
            const helmet = Helmet.renderStatic();

            const title = helmet.title.toString();
            const meta = helmet.meta.toString();
            const bodyAttributes = helmet.bodyAttributes.toString();

            // TODO: сейчас подключается только index — возможно, стоит руками подключать index, vendor и переводы
            const { assets } = manifest.entrypoints.index;

            res.render('index', { html, title, meta, bodyAttributes, assets });
        });
    }
}
