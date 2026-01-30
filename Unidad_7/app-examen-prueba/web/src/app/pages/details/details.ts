import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = '';
  movie: Movie | undefined;
  movieService = inject(MovieService);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.movieId = String(this.route.snapshot.params['id']);
    this.movieService.getById(this.movieId).then((movie: Movie) => {
      this.movie = movie;
      this.changeDetectorRef.markForCheck();
    });
  }
}
