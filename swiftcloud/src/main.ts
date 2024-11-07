import 'reflect-metadata'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import express from 'express'
import { WinstonModule } from 'nest-winston'
import { httpLoggerMiddleware, logFormat, loggerTransports } from 'utils'
import { CORS_ORIGIN, NODE_ENV, PORT } from 'config'
import { ExcludeInterceptor } from 'controllers/interceptors'
import { TypeOrmErrorFilter } from 'controllers/filters'
import { AppModule } from 'modules'
import packageJson from '../package.json'

async function bootstrap() {
  const app = express()

  app.enable('trust proxy')
  app.use(httpLoggerMiddleware)

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app), {
    cors: {
      origin:
        typeof CORS_ORIGIN === 'string' ? CORS_ORIGIN.split(',') : CORS_ORIGIN,
      credentials: true,
    },
    logger: WinstonModule.createLogger({
      format: logFormat,
      transports: loggerTransports,
    }),
  })

  nestApp.useGlobalPipes(new ValidationPipe())
  nestApp.useGlobalInterceptors(new ExcludeInterceptor())
  nestApp.useGlobalFilters(
    new TypeOrmErrorFilter(nestApp.get(HttpAdapterHost).httpAdapter)
  )

  if (NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('XPM Auth API')
      .setDescription('XPM Auth API')
      .setVersion(packageJson.version)
      .build()
    const document = SwaggerModule.createDocument(nestApp, config)
    SwaggerModule.setup('/api', nestApp, document)
  }

  await nestApp.listen(PORT)
}

bootstrap()
