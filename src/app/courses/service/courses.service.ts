import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {

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
    if(record.id){
      return this.update(record);
    }
    return this.create(record);

  }

  findById(id: string): Observable<Course> {
    return this._httpClient.get<Course>(`${this.API}/${id}`).pipe(first());
  }

  private create(record: Partial<Course>){
    return this._httpClient.post<Course>(this.API, record)
   .pipe(
    first()
  )}

  private update(record: Partial<Course>){
    return this._httpClient.put<Course>(`${this.API}/${record.id}`, record)
   .pipe(first());
  }

  remove(id: string){
    return this._httpClient.delete(`${this.API}/${id}`)
   .pipe(first());
  }

}
