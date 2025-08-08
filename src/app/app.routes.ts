import { Routes } from '@angular/router';
import { App } from './app';
import { Courses } from './courses/courses';
import { CourseForm } from './courses/course-form/course-form';

export const routes: Routes = [
  {
    path: '',
     pathMatch: 'full', redirectTo: 'courses'
   },
   {
    path: 'courses',
    component: Courses,
  },
  {
    path: 'courses/new',
    component: CourseForm,
  },
];
