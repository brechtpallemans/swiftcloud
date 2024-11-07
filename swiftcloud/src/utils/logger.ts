import { transports, format, createLogger } from 'winston'
import expressWinston from 'express-winston'
import chalk from 'chalk'

export const loggerTransports = [new transports.Console({ level: 'debug' })]

const transformDuration = (info) => {
  if (info.durationMs) info.durationMs = ` ${info.durationMs}ms`
  else info.durationMs = ''
  return info
}

const transformStack = (info) => {
  if (/error/.test(info.level) && info.stack)
    info.stack = '\n  ' + chalk.red(info.stack)
  else info.stack = ''
  return info
}

const getTemplate = (lgr) =>
  `${lgr.timestamp} - ${lgr.level} - [${lgr.context}]: ${lgr.message}${lgr.durationMs}${lgr.stack}`

export const logFormat = format.combine(
  { transform: transformDuration },
  { transform: transformStack },
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.printf(getTemplate)
)

export const httpLoggerMiddleware = expressWinston.logger({
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  level: 'http',
  colorize: true,
  winstonInstance: createLogger({
    format: logFormat,
    transports: loggerTransports,
    defaultMeta: { context: 'Express' },
  }),
})
