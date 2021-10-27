import React from 'react';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { initRouter, routesConfig } from 'src/common/initRouter';
import { AppService } from './app.service';
import { Helmet } from 'react-helmet';

const routes = Object.keys(routesConfig);

@Controller(routes)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    index(@Req() req: Request, @Res() res: Response) {
        const router = initRouter(routesConfig);

        router.start(req.originalUrl, function done(error, state) {
            if (error) {
                res.status(500).send(error);
            } else {
                const { Component } = routesConfig[state.name];

                const html = renderToString(<Component />);
                const helmet = Helmet.renderStatic();

                const title = helmet.title.toString();
                const meta = helmet.meta.toString();
                const bodyAttributes = helmet.bodyAttributes.toString();

                res.render('index', { html, title, meta, bodyAttributes });
            }
        });
    }
}
