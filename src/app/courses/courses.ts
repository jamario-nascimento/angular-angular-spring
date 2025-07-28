import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { Course } from './model/course';
import { CoursesServices } from './service/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit{

  courses: Course[] = [];
  displayedColumns: string[] = ['_id', 'name', 'category'];
  dataToDisplay = [...this.courses];

  constructor(private coursesService: CoursesServices){

    this.courses = this.coursesService.list();

  }


  ngOnInit(){

  }





}
