import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  NotFoundException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm'

interface TypeORMException extends TypeORMError {
  detail: string
}
@Catch(TypeORMError)
export class TypeOrmErrorFilter extends BaseExceptionFilter {
  catch(error: TypeORMException, host: ArgumentsHost) {
    switch (true) {
      case error instanceof QueryFailedError:
        return super.catch(
          new BadRequestException(error.detail ?? error.message, {
            cause: error,
          }),
          host
        )
      case error instanceof EntityNotFoundError:
        return super.catch(
          new NotFoundException(error.detail ?? error.message, {
            cause: error,
          }),
          host
        )
      default:
        return super.catch(
          new BadRequestException(error.name, { cause: error }),
          host
        )
    }
  }
}
