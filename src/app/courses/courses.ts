// src/app/courses/courses.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Correto, use MatIconModule

import { Observable, of } from 'rxjs'; // Importe 'of'
import { startWith, catchError } from 'rxjs/operators'; // Importe startWith e catchError

import { Course } from './model/course';
import { CoursesServices } from './service/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class Courses implements OnInit {

  // O ponto chave: 'startWith([])' no pipeline do Observable
  courses$: Observable<Course[]>; // Nomeclatura com '$' é uma boa prática

  displayedColumns: string[] = ['_id', 'name', 'category', 'actions']; // Incluí 'actions'

  constructor(private _coursesService: CoursesServices) {
        // Carrega os cursos e usa 'startWith([])' para inicializar a tabela com um array vazio
    this.courses$ = this._coursesService.list().pipe(
      startWith([]), // <-- Esta linha resolve o erro do 'null' inicial
      catchError(error => {
        console.error('Erro ao carregar cursos:', error);
        // Em caso de erro, também emite um array vazio para a tabela não quebrar
        return of([]);
      })
    );
  }

  ngOnInit(): void {

  }

  // Métodos de ação (placeholder)
  onAdd(): void {
    console.log('Adicionar novo curso');
  }

  onEdit(course: Course): void {
    console.log('Editar curso:', course);
  }

  onDelete(course: Course): void {
    console.log('Deletar curso:', course);
  }
}
