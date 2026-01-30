import { ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { Car } from '../../interfaces/car';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink],
  templateUrl: './car-card.html',
  styleUrls: ['./car-card.css'],
})
export class CarCard implements OnInit {
  car = input.required<Car>();
  carService = inject(CarService);
  loginService = inject(LoginService);
  cdr = inject(ChangeDetectorRef);
  isAdmin = false;
  isUser = false;
  async ngOnInit(): Promise<void> {
    console.log('TOKEN:', this.loginService.getToken());

    this.isAdmin = await this.loginService.isAdmin();
    const currentUser = await this.loginService.verifyToken(this.loginService.getToken() ?? '');
    this.isUser =
      this.car().user.name === currentUser.name &&
      this.car().user.password === currentUser.password &&
      this.car().user.admin === currentUser.admin;
    this.cdr.detectChanges();
  }
  async deleteCar(id: string | undefined) {
    await this.carService.delete(id ?? '');
    location.reload();
  }
}
