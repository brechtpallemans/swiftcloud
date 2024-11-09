import { Module } from '@nestjs/common'
import { AlbumController } from 'controllers/album.controller'
import { ArtistController } from 'controllers/artist.controller'
import { SongController } from 'controllers/song.controller'
import { SongArtistController } from 'controllers/songArtist.controller'
import { SongMonthlyStatController } from 'controllers/songMonthlyStat.controller'
import { QueryService } from 'services'

@Module({
  imports: [],
  controllers: [
    AlbumController,
    ArtistController,
    SongController,
    SongArtistController,
    SongMonthlyStatController,
  ],
  providers: [QueryService],
  exports: [QueryService],
})
export class ApiModule {}
