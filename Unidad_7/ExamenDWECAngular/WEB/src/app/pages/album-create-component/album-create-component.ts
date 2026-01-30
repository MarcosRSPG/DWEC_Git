import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { Router, RouterLink } from '@angular/router';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-album-create-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './album-create-component.html',
  styleUrls: ['./album-create-component.css'],
})
export class AlbumCreate {
  albumService = inject(AlbumService);
  applyForm = new FormGroup({
    title: new FormControl(''),
    artist: new FormControl(''),
    year: new FormControl(1990),
    genre: new FormControl(''),
  });
  album?: Album;
  router: Router = inject(Router);
  async crearAlbum() {
    const title = this.applyForm.value.title ?? '';
    const artist = this.applyForm.value.artist ?? '';
    const year = this.applyForm.value.year ?? 0;
    const genre = this.applyForm.value.genre ?? '';
    await this.albumService.post([{ title, artist, year, genre, coverUrl: '' }]);
    this.router.navigate(['/']);
  }

  async submit() {
    await this.crearAlbum();
  }
}
