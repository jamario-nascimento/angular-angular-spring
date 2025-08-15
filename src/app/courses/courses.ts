import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog';

import { Course } from './model/course';
import { CoursesServices } from './service/courses.service';
import { CategoryPipe } from "../shared/pipes/category-pipe";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    CategoryPipe,
],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  displayedColumns: string[] = ['name', 'category', 'actions'];
private readonly snackBar = inject(MatSnackBar);
  durationInSeconds = 3000;

  constructor(
    private readonly _coursesService: CoursesServices,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
     this.refresh();
  }

  refresh(): void {
    this.courses$ = this._coursesService.list().pipe(
      catchError(error => {
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

    this._coursesService.remove(course.id!)
      .subscribe({
        next: () => {
          this.snackBar.open('Curso removido com sucesso!', '', { duration: 3000 });
          this.refresh();
        },
        error: (error) => {
          console.error('Erro ao remover o curso:', error);
          this.snackBar.open('Curso excluido', '', { duration: this.durationInSeconds, verticalPosition: 'top' });
        }
      });
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
