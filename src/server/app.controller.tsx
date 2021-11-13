import { Controller, Get, Req, Res } from '@nestjs/common';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { initRouter, routesConfig } from '../common/initRouter';
import { AppService } from './app.service';
import { Helmet } from 'react-helmet';
import { initApplication } from '../pages';

@Controller('*')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        // https://router5.js.org/advanced/universal-routing#server-side-routing
        const router = initRouter(routesConfig); // TODO: передавать basePath из конфига

        router.start(req.originalUrl, function done(error, state) {
            if (error) {
                res.status(404); // TODO: проверять код ошибки, чтобы выбрать код 404 или 500
            }

            const application = initApplication(router);

            const html = renderToString(application);
            const helmet = Helmet.renderStatic();

            const title = helmet.title.toString();
            const meta = helmet.meta.toString();
            const bodyAttributes = helmet.bodyAttributes.toString();

            res.render('index', { html, title, meta, bodyAttributes });
        });
    }
}
