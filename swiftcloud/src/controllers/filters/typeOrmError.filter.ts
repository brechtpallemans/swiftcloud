import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  NotFoundException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { EntityNotFoundError, TypeORMError } from 'typeorm'

/**
 * The reason I put this here is because in a lot of cases the query that is
 * parsed and sent to the database is just not compatible with the schema.
 * In that case, I want to return a 400 status due to the user input being
 * the cause of the error.
 */
@Catch(TypeORMError)
export class TypeOrmErrorFilter extends BaseExceptionFilter {
  catch(error: TypeORMError, host: ArgumentsHost) {
    switch (true) {
      case error instanceof EntityNotFoundError:
        return super.catch(
          new NotFoundException(error.message, {
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
