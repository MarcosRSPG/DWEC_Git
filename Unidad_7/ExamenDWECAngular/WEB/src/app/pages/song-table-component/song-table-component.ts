import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Song } from '../../interfaces/song';
import { SongService } from '../../services/song.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-song-table-component',
  imports: [RouterLink],
  templateUrl: './song-table-component.html',
  styleUrl: './song-table-component.css',
})
export class SongTableComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  songService: SongService = inject(SongService);
  albumService: AlbumService = inject(AlbumService);
  listaFiltrada: Song[] = [];
  idParam = this.route.snapshot.params['id'];
  album?: Album;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.songService.getByAlbum(this.idParam).then((listaSongs: Song[]) => {
      this.listaFiltrada = listaSongs;
      this.albumService.getById(this.idParam).then((album: Album) => {
        this.album = album;
      });
      this.changeDetectorRef.markForCheck();
    });
  }
  eliminarSong(id: string | '') {
    this.songService.delete(id).then((result) => {});
    location.reload();
  }
}
