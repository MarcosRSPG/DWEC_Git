import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  url = 'http://localhost:3400/songs';
  async get(): Promise<Song[]> {
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
  async getByAlbum(id: string): Promise<Song[]> {
    const songs = await fetch(this.url + `/${id}/songs`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Something went wrong GETTING on API server!');
        }
        return response.json();
      })

      .catch((error) => {
        console.log(error);
      });
    return songs;
  }
  async getById(id: string): Promise<Song> {
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
  async post(songs: Song[]): Promise<boolean> {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(songs),
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
  async put(song: Song): Promise<boolean> {
    return await fetch(this.url + `/${song._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
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
