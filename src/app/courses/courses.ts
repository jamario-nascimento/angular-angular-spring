// src/app/courses/courses.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

// Imports diretos do Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Import do componente standalone de diálogo de erro
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog'; // Renomeei para seguir a convenção

import { Course } from './model/course';
import { CoursesServices } from './service/courses.service';
import { CategoryPipe } from "../shared/pipes/category-pipe";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    // Importe apenas os módulos que você realmente usa!
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    CategoryPipe
],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class CoursesComponent implements OnInit { // Renomeei para CoursesComponent
  courses$: Observable<Course[]> | null = null;
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private _coursesService: CoursesServices,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // A inicialização foi movida para ngOnInit
    this.courses$ = this._coursesService.list().pipe(
      startWith([]),
      catchError((error) => {
        console.error('Erro ao carregar cursos:', error);
        this.openErrorDialog('Erro ao carregar os cursos');
        return of([]);
      })
    );
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onDelete(course: Course): void {
    console.log('Deletar curso:', course);
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'Ocorreu um Erro',
        content: errorMessage,
      },
    });
  }
}
