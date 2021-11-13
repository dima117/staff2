import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setBaseViewsDir(join(__dirname, '..', '..', '..', 'views')); // TODO: копировать view и передавать путь к нему из конфига
    app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
