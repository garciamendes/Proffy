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
  })

  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: Boolean(process.env.SESSION_REVASE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: +86400 },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
