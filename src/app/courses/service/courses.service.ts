// courses.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {

  // Altere esta linha:
  private coursesUrl = 'assets/courses2.json';

  constructor(private _httpClient: HttpClient){ }

  list() {
    return this._httpClient.get<Course[]>(this.coursesUrl)
    .pipe(
      first(),
      delay(5000),
      tap(courses => console.log(courses))
    );
  }
}
