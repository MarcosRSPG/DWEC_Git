import { Injectable } from '@angular/core';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  url = 'http://localhost:3400/albums';
  async get(): Promise<Album[]> {
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
  async getNumSongs(id: string): Promise<number> {
    return await fetch(this.url + `/${id}/songs`)
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
  async getById(id: string): Promise<Album> {
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
  async post(albums: Album[]): Promise<boolean> {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(albums),
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
  async put(album: Album): Promise<boolean> {
    return await fetch(this.url + `/${album._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(album),
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
