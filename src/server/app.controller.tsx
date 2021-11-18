import { Controller, Get, Req, Res } from '@nestjs/common';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { initRouter, routesConfig } from '../common/initRouter';
import { AppService } from './app.service';
import { Helmet } from 'react-helmet';
import { initApplication } from '../pages';

import { join } from 'path';
import { parseManifest } from '../common/formats/manifest';

const manifestPath = join(process.cwd(), 'public', 'assets-manifest.json');
const manifestJson = require(manifestPath);
const manifest = parseManifest(manifestJson); // TODO: убрать в модуль

@Controller('*')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        // https://router5.js.org/advanced/universal-routing#server-side-routing
        const router = initRouter(routesConfig); // TODO: передавать basePath из конфига

        router.start(req.originalUrl, async function done(error, state) {
            if (error) {
                res.status(404); // TODO: проверять код ошибки, чтобы выбрать код 404 или 500
            }

            await routesConfig[state.name].loadComponent();

            const application = initApplication(router);

            const html = renderToString(application);
            const helmet = Helmet.renderStatic();

            const title = helmet.title.toString();
            const meta = helmet.meta.toString();
            const bodyAttributes = helmet.bodyAttributes.toString();

            const { assets } = manifest.entrypoints.index;

            res.render('index', { html, title, meta, bodyAttributes, assets });
        });
    }
}
