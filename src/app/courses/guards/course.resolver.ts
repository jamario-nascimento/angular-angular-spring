// src/app/courses/guards/course.resolver.ts
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CoursesServices } from '../service/courses.service';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';

// O tipo de retorno é ResolveFn<Course>
export const courseResolver: ResolveFn<Course> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Course> => {

  const service = inject(CoursesServices);
  const id = route.params['id'];

  // Se o ID existe na rota, estamos em modo de edição
  if (id) {
    // Retorna o curso encontrado pelo ID
    return service.findById(id);
  }

  // Se não há ID, estamos em modo de criação
  // Retorna um curso "vazio" para o formulário
  return of({ id: '', name: '', category: '' });
};
