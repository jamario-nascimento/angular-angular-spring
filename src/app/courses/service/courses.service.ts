// courses.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {

  // Altere esta linha:
  private readonly API = 'api/courses';

  constructor(private readonly _httpClient: HttpClient){ }

  list() {
    return this._httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      tap(courses => console.log(courses))
    );
  }

  save(record: Partial<Course>){
   return this._httpClient.post<Course>(this.API, record)
   .pipe(
    first()
   )
  }

  findById(id: string): Observable<Course> {
    return this._httpClient.get<Course>(`${this.API}/${id}`).pipe(first());
  }
}
