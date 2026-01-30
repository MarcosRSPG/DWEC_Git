import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SellingCars } from './pages/selling-cars/selling-cars';
import { Details } from './pages/details/details';
import { SellYours } from './pages/sell-yours/sell-yours';
import { Editar } from './pages/editar/editar';
import { Aboutus } from './pages/aboutus/aboutus';
import { Login } from './pages/login/login';

const routeConfig: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'selling-cars',
    component: SellingCars,
    title: 'Selling cars',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Buy car',
  },
  {
    path: 'sell-yours',
    component: SellYours,
    title: 'Sell your car',
  },
  {
    path: 'edit/:id',
    component: Editar,
    title: 'Edit your car',
  },
  {
    path: 'aboutus',
    component: Aboutus,
    title: 'About us',
  },
];
export default routeConfig;
