import { Routes } from '@angular/router';
import { Details } from './pages/details/details';
import { Editar } from './pages/editar/editar';
import { Aboutus } from './pages/aboutus/aboutus';
import { MovieList } from './pages/movie-list-component/movie-list-component';

const routeConfig: Routes = [
  {
    path: '',
    component: MovieList,
    title: 'Movie List',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Details of the film',
  },
  {
    path: 'edit/:id',
    component: Editar,
    title: 'Edit a film',
  },
  {
    path: 'create',
    component: Editar,
    title: 'Create a film',
  },
  {
    path: 'aboutus',
    component: Aboutus,
    title: 'About us',
  },
];
export default routeConfig;
