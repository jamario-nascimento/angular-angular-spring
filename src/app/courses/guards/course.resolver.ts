import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CoursesServices } from '../service/courses.service';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Course> => {

  const service = inject(CoursesServices);
  const id = route.params['id'];


  if (id) {
    // Retorna o curso encontrado pelo ID
    return service.findById(id);
  }

  return of({ id: '', name: '', category: '' });
};
