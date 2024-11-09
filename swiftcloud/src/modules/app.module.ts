import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthController } from 'controllers'
import { dataSourceOptions } from 'db'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
