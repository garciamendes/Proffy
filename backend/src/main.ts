import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'
import * as process from 'process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
