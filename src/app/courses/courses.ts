import { routes } from './../app.routes';
// src/app/courses/courses.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { MaterialModule } from '../shared/material-module';
import { Course } from './model/course';
import { CoursesServices } from './service/courses.service';
import { ErrorDialog } from '../shared/components/error-dialog/error-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  // O ponto chave: 'startWith([])' no pipeline do Observable
  courses$: Observable<Course[]>; // Nomeclatura com '$' é uma boa prática

  displayedColumns: string[] = ['_id', 'name', 'category', 'actions']; // Incluí 'actions'

  constructor(
    private _coursesService: CoursesServices,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Carrega os cursos e usa 'startWith([])' para inicializar a tabela com um array vazio
    this.courses$ = this._coursesService.list().pipe(
      startWith([]), // <-- Esta linha resolve o erro do 'null' inicial
      catchError((error) => {
        console.error('Erro ao carregar cursos:', error);
        this.openErrorDialog('Erro ao carregar os cursos');
         // Retorna um array vazio para a UI
        // Em caso de erro, também emite um array vazio para a tabela não quebrar
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  // Métodos de ação (placeholder)
  onAdd(): void {
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  onEdit(course: Course): void {
    console.log('Editar curso:', course);
  }

  onDelete(course: Course): void {
    console.log('Deletar curso:', course);
  }

  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialog, {
      // Aqui passamos o objeto de dados que nosso ErrorDialogComponent espera
      data: {
        title: 'Ocorreu um Erro',
        content: errorMessage
      }
    });
  }
}
