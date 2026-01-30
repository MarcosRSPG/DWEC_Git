import { Routes } from '@angular/router';
import { AlbumListComponent } from './pages/album-list-component/album-list-component';
import { AlbumCreate } from './pages/album-create-component/album-create-component';
import { SongTableComponent } from './pages/song-table-component/song-table-component';
import { SongCreateComponent } from './pages/song-create-component/song-create-component';

const routeConfig: Routes = [
  {
    path: '',
    component: AlbumListComponent,
    title: 'Album List',
  },
  {
    path: 'create',
    component: AlbumCreate,
    title: 'Create Album',
  },
  {
    path: 'songs/:id',
    component: SongTableComponent,
    title: 'Songs',
  },
  {
    path: 'create/song/:id',
    component: SongCreateComponent,
    title: 'Create Song',
  },
];
export default routeConfig;
