import { Component, inject, input } from '@angular/core';
import { Car } from '../../interfaces/car';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  car = input.required<Car>();
  carService = inject(CarService);

  async deleteCar(id: string | undefined) {
    await this.carService.delete(id ?? '');
    location.reload();
  }
}
