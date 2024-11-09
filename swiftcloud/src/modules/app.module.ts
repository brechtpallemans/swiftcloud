import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthController } from 'controllers'
import { dataSourceOptions } from 'db'
import { ApiModule } from './api.module'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ApiModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
