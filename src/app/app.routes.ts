import { Routes } from '@angular/router';
import { App } from './app';
import { CourseFormComponent } from './courses/course-form/course-form';
import { courseResolver } from './courses/guards/course.resolver';
import { CoursesComponent } from './courses/courses';

export const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'new', component: CourseFormComponent, resolve: { course: courseResolver } },
  { path: 'edit/:id', component: CourseFormComponent, resolve: { course: courseResolver } }
];

