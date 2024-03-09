import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    { cors: true, logger: ['error', 'fatal', 'log', 'verbose', 'warn'] })

    app.enableCors({
    origin: '*',
  })

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    index: false,
    prefix: '/uploads',
  });

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3333)
}
bootstrap()
