import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Song } from '../../interfaces/song';
import { SongService } from '../../services/song.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-song-create-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './song-create-component.html',
  styleUrl: './song-create-component.css',
})
export class SongCreateComponent {
  songService = inject(SongService);
  albumService = inject(AlbumService);
  applyForm = new FormGroup({
    title: new FormControl(''),
    duration: new FormControl(0),
    rating: new FormControl(0),
  });
  album?: Album;
  song?: Song;
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  idParam = this.route.snapshot.params['id'];
  constructor() {
    this.albumService.getById(this.idParam).then((album: Album) => {
      this.album = album;
    });
  }
  async crearSong() {
    const title = this.applyForm.value.title ?? '';
    const duration = this.applyForm.value.duration ?? 0;
    const rating = this.applyForm.value.rating ?? 0;
    const id = this.idParam;
    await this.songService.post([{ title, duration, rating, albumId: id, listened: false }]);
  }

  async submit() {
    await this.crearSong();
    this.router.navigate(['/songs'], this.idParam);
  }
}
