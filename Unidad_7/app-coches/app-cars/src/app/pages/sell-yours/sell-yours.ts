import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Car } from '../../interfaces/car';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-sell-yours',
  imports: [ReactiveFormsModule],
  templateUrl: './sell-yours.html',
  styleUrl: './sell-yours.css',
})
export class SellYours {
  carService = inject(CarService);
  applyForm = new FormGroup({
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(1990),
    price: new FormControl(0),
    photo: new FormControl(''),
  });
  loginService = inject(LoginService);
  user: User | null = null;
  router: Router = inject(Router);
  async submitCar() {
    const userCompleto = await this.loginService.verifyToken(this.loginService.getToken() ?? '');
    this.user = {
      name: userCompleto.name,
      password: userCompleto.password,
      admin: userCompleto.admin,
    };
    await this.carService.post([
      this.comprobarCar(
        this.applyForm.value.brand ?? '',
        this.applyForm.value.model ?? '',
        this.applyForm.value.year ?? 0,
        this.applyForm.value.price ?? 0,
        this.applyForm.value.photo ?? '',
      ),
    ]);
    this.router.navigate(['/selling-cars']);
  }
  comprobarCar(brand: string, model: string, year: number, price: number, photo: string): Car {
    const checkBrand = brand.length >= 1;
    const checkModel = model.length >= 1;
    const checkYear = year >= 1890;
    const checkPhoto = photo.endsWith('.jpg') || photo.endsWith('.png') || photo.endsWith('.jpeg');

    if (!(checkBrand && checkModel && checkYear && checkPhoto)) {
      throw new Error('Datos de coche inválidos');
    }

    return { brand, model, year, price, photo, user: this.user! };
  }
}
