import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  movieService = inject(MovieService);
  applyForm = new FormGroup({
    title: new FormControl(''),
    genre: new FormControl(''),
    year: new FormControl(1990),
    platform: new FormControl(''),
    rating: new FormControl(0),
    photo: new FormControl(''),
  });
  movie: Movie | undefined;
  movieId = String(this.route.snapshot.params['id']);
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.movieService.getById(this.movieId).then((movie: Movie) => {
      this.movie = movie;
      this.applyForm.patchValue({
        title: movie.title,
        genre: movie.genre,
        year: movie.year,
        platform: movie.platform,
        rating: movie.rating,
        photo: movie.photo,
      });
      this.changeDetectorRef.markForCheck();
    });
  }
  async crearMovie() {
    const title = this.applyForm.value.title ?? '';
    const genre = this.applyForm.value.genre ?? '';
    const year = this.applyForm.value.year ?? 0;
    const platform = this.applyForm.value.platform ?? '';
    const rating = this.applyForm.value.rating ?? 0;
    const photo = this.applyForm.value.photo ?? '';
    await this.movieService.post([{ title, genre, year, platform, rating, photo }]);
    this.router.navigate(['/']);
  }
  async editarMovie() {
    const id = this.movieId;
    const title = this.applyForm.value.title ?? '';
    const genre = this.applyForm.value.genre ?? '';
    const year = this.applyForm.value.year ?? 0;
    const platform = this.applyForm.value.platform ?? '';
    const rating = this.applyForm.value.rating ?? 0;
    const photo = this.applyForm.value.photo ?? '';
    await this.movieService.put({ _id: id, title, genre, year, platform, rating, photo });
    this.router.navigate(['/']);
  }
}
