import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // TODO: сделать хелпер для формирования путей от корня
    // TODO: копировать view и передавать путь к нему из конфига
    // TODO: настроить заголовки статики для dev и prod режима
    // TODO: ServeStaticModule
    app.useStaticAssets(join(process.cwd(), 'public'));
    app.setBaseViewsDir(join(process.cwd(), 'views'));
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
