import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { Observable, map } from 'rxjs'

/**
 * Using the class-transformer library, we map the response data to exclude
 * fields tagged by the "Exclude" decorator.
 */
@Injectable()
export class ExcludeInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(_, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => instanceToPlain(data)))
  }
}
