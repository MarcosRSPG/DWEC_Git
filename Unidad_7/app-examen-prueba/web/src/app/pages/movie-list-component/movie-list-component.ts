import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'movie-list-component',
  imports: [MovieCard],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css',
})
export class MovieList {
  listaMovies: Movie[] = [];
  listaPlatforms: String[] = [];
  listaGenres: String[] = [];
  movieService: MovieService = inject(MovieService);
  listaFiltrada: Movie[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.movieService.get().then((listaMovies: Movie[]) => {
      this.listaMovies = listaMovies;
      this.listaFiltrada = listaMovies;
      this.changeDetectorRef.markForCheck();
    });
    this.movieService.getPlatforms().then((listaPlatforms: String[]) => {
      this.listaPlatforms = listaPlatforms;
      this.changeDetectorRef.markForCheck();
    });
    this.movieService.getGenres().then((listaGenres: String[]) => {
      this.listaGenres = listaGenres;
      this.changeDetectorRef.markForCheck();
    });
  }

  filterResults(filter: string, platform: string, genre: string) {
    const q = (filter ?? '').trim().toLowerCase();
    let result = [...this.listaMovies];
    if (q) {
      result = result.filter(
        (movie) =>
          ((movie.title ?? '').toLowerCase().includes(q) ||
            (movie.genre ?? '').toLowerCase().includes(q)) &&
          (movie.platform ?? '').toLowerCase().includes(platform) &&
          (movie.genre ?? '').toLowerCase().includes(genre),
      );
    }

    this.listaFiltrada = result;
  }
}
