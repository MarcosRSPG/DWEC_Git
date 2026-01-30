import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'http://localhost:3000/api/movies';
  async get(): Promise<Movie[]> {
    return await fetch(this.url)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong GETTING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async getPlatforms(): Promise<String[]> {
    return await fetch(this.url + '/platforms')
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong GETTING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async getGenres(): Promise<String[]> {
    return await fetch(this.url + '/genres')
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong GETTING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async getById(id: string): Promise<Movie> {
    return await fetch(this.url + `/${id}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong GETTING BY ID on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async post(movies: Movie[]): Promise<boolean> {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movies),
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong POSTING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async put(movie: Movie): Promise<boolean> {
    return await fetch(this.url + `/${movie._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong PUTTING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async delete(id: string): Promise<boolean> {
    return await fetch(this.url + `/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong DELETING on API server!');
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
