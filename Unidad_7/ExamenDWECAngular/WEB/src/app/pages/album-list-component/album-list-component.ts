import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Album } from '../../interfaces/album';
import { AlbumService } from '../../services/album.service';
import { RouterLink } from '@angular/router';
import { AlbumTd } from '../../components/album-td/album-td';

@Component({
  selector: 'app-album-list-component',
  imports: [RouterLink, AlbumTd],
  templateUrl: './album-list-component.html',
  styleUrl: './album-list-component.css',
})
export class AlbumListComponent {
  listaAlbums: Album[] = [];
  albumService: AlbumService = inject(AlbumService);
  listaFiltrada: Album[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.albumService.get().then((listaAlbums: Album[]) => {
      this.listaAlbums = listaAlbums;
      this.listaFiltrada = listaAlbums;
      this.changeDetectorRef.markForCheck();
    });
  }

  filterResults(filter: string) {
    const q = (filter ?? '').trim().toLowerCase();
    let result = [...this.listaAlbums];
    if (q) {
      result = result.filter((album) => (album.genre ?? '').toLowerCase().includes(q));
    }

    this.listaFiltrada = result;
  }
  eliminarAlbum(id: string | '') {
    this.albumService.delete(id).then((result) => {});
    location.reload();
  }
}
