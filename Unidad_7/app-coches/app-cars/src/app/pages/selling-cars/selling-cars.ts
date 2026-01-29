import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarCard } from '../../components/car-card/car-card';
import { Car } from '../../interfaces/car';

@Component({
  selector: 'app-selling-cars',
  imports: [CarCard],
  templateUrl: './selling-cars.html',
  styleUrl: './selling-cars.css',
})
export class SellingCars {
  listaCars: Car[] = [];
  carService: CarService = inject(CarService);
  listaFiltrada: Car[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.carService.get().then((listaCars: Car[]) => {
      this.listaCars = listaCars;
      this.listaFiltrada = listaCars;
      this.changeDetectorRef.markForCheck();
    });
  }

  filterResults(filter: string, type: string, order: string, orientation: string) {
    const q = (filter ?? '').trim().toLowerCase();
    let result = [...this.listaCars];
    if (q) {
      switch (type) {
        case 'brand':
          result = result.filter((car) => (car.brand ?? '').toLowerCase().includes(q));
          break;

        case 'model':
          result = result.filter((car) => (car.model ?? '').toLowerCase().includes(q));
          break;

        default:
          break;
      }
    }
    if (order === 'price' || order === 'year') {
      const dir = orientation === 'des' ? -1 : 1;

      result.sort((a, b) => {
        const av = a[order] ?? 0;
        const bv = b[order] ?? 0;
        return (av - bv) * dir;
      });
    }

    this.listaFiltrada = result;
  }
}
