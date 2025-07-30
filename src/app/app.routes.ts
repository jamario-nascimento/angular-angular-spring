import { Routes } from '@angular/router';
import { App } from './app';
import { Courses } from './courses/courses';

export const routes: Routes = [
  {
    path: '',
     pathMatch: 'full', redirectTo: 'courses'
   },
   {
    path: 'courses',
    component: Courses,
  },
];
