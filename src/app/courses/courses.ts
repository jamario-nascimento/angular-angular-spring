import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';

import { Course } from './model/course';


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

  constructor(){
    this.courses =  [
      {_id:"1", name: 'Hydrogen', category:" 1.0079"},
      {_id: "2", name: 'Helium', category: "4.0026"},
      {_id: "3", name: 'Lithium', category: "6.941"},
      {_id: "4", name: 'Beryllium', category: "9.0122"},
      {_id: "5", name: 'Boron', category: "10.811"},
      {_id: "6", name: 'Carbon', category: "12.0107"},
      {_id: "7", name: 'Nitrogen', category: "14.0067"},
      {_id: "8", name: 'Oxygen', category:" 15.9994"},
      {_id: "9", name: 'Fluorine', category: "18.9984"},
      {_id: "10", name: 'Neon', category: "20.1797"},
    ];

  }


  ngOnInit(){

  }





}
