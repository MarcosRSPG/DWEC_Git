import { Component, inject, input } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard {
  movie = input.required<Movie>();
  movieService = inject(MovieService);

  async deleteMovie(id: string | undefined) {
    await this.movieService.delete(id ?? '');
    location.reload();
  }
  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
