import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = 'http://localhost:3000/cars';
  async get(): Promise<Car[]> {
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
  async getById(id: string): Promise<Car> {
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
  async post(cars: Car[]): Promise<boolean> {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cars),
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
  async put(car: Car): Promise<boolean> {
    return await fetch(this.url + `/${car._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
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
