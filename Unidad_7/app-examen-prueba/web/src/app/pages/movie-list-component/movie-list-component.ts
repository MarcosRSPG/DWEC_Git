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
  listaPlatforms: string[] = [];
  listaGenres: string[] = [];
  movieService: MovieService = inject(MovieService);
  listaFiltrada: Movie[] = [];
  constructor() {
    this.cargarDatos(inject(ChangeDetectorRef));
  }
  async cargarDatos(cdr: ChangeDetectorRef) {
    Promise.all([
      await this.movieService.get(),
      await this.movieService.getPlatforms(),
      await this.movieService.getGenres(),
    ])
      .then(([movies, platforms, genres]) => {
        this.listaMovies = movies;
        this.listaFiltrada = movies;
        this.listaPlatforms = platforms;
        this.listaGenres = genres;

        cdr.markForCheck();
      })
      .catch((e) => console.log('Error cargando datos:', e));
  }
  filterResults(filter: string, platform: string, genre: string) {
    const q = (filter ?? '').trim().toLowerCase();
    let result = [...this.listaMovies];
    if (q) {
      result = result.filter(
        (movie) =>
          (movie.title ?? '').toLowerCase().includes(q) ||
          (movie.genre ?? '').toLowerCase().includes(q),
      );
    }
    result = result.filter(
      (movie) =>
        (movie.platform ?? '').toLowerCase().includes(platform.toLowerCase()) &&
        (movie.genre ?? '').toLowerCase().includes(genre.toLowerCase()),
    );
    this.listaFiltrada = result;
  }
}
