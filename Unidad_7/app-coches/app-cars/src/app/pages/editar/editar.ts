import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  carService = inject(CarService);
  applyForm = new FormGroup({
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(1990),
    price: new FormControl(0),
    photo: new FormControl(''),
  });
  car: Car | undefined;

  carId = String(this.route.snapshot.params['id']);
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.carService.getById(this.carId).then((car: Car) => {
      this.car = car;
      this.applyForm.patchValue({
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        photo: car.photo,
      });
      this.changeDetectorRef.markForCheck();
    });
  }
  async editarCar() {
    await this.carService.put(
      this.comprobarCar(
        this.applyForm.value.brand ?? '',
        this.applyForm.value.model ?? '',
        this.applyForm.value.year ?? 0,
        this.applyForm.value.price ?? 0,
        this.applyForm.value.photo ?? '',
      ),
    );
    this.router.navigate(['/selling-cars']);
  }
  comprobarCar(brand: string, model: string, year: number, price: number, photo: string): Car {
    const checkBrand = brand.length >= 1;
    const checkModel = model.length >= 1;
    const checkYear = year >= 1890;
    const checkPhoto = photo.endsWith('.jpg') || photo.endsWith('.png');

    if (!(checkBrand && checkModel && checkYear && checkPhoto)) {
      throw new Error('Datos de coche inválidos');
    }
    return { _id: this.carId, brand, model, year, price, photo };
  }
}
