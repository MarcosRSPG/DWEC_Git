import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../interfaces/album';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-td',
  imports: [RouterLink],
  templateUrl: './album-td.html',
  styleUrl: './album-td.css',
})
export class AlbumTd {
  albumService: AlbumService = inject(AlbumService);
  album = input.required<Album>();
  songs?: number;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    /*  this.albumService.getNumSongs(this.album()._id || '').then((songs: number) => {
      this.songs = songs;
      this.changeDetectorRef.markForCheck();
    });*/
    this.songs = 0;
  }

  async eliminarAlbum(id: string | undefined) {
    await this.albumService.delete(id ?? '');
    location.reload();
  }
}
