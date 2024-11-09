import { Controller, Get, Header, HttpStatus } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

class HealthCheckResponse {
  @ApiProperty({ example: 'available' })
  status: string
  @ApiProperty({ example: new Date().toISOString() })
  startedAt: string
}

@ApiTags('health')
@Controller()
export class HealthController {
  @Get()
  @Header('Cache-Control', 'none')
  @ApiOperation({ description: 'Check server status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: HealthCheckResponse,
  })
  async getHealth() {
    const startedAt = new Date(
      Date.now().valueOf() - Math.round(process.uptime() * 1000)
    )

    return {
      status: 'available',
      startedAt: startedAt.toISOString(),
    }
  }
}
