// courses.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {

  // Altere esta linha:
  private coursesUrl = 'assets/courses.json';

  constructor(private _httpClient: HttpClient){ }

  list() {
    return this._httpClient.get<Course[]>(this.coursesUrl)
    .pipe(
      tap(courses => console.log(courses))
    );
  }
}
