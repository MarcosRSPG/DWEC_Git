import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../interfaces/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  carId = '';
  car: Car | undefined;
  carService = inject(CarService);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.carId = String(this.route.snapshot.params['id']);
    this.carService.getById(this.carId).then((car: Car) => {
      this.car = car;
      this.changeDetectorRef.markForCheck();
    });
  }
}
