import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

// Imports diretos do Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { CoursesServices } from '../service/courses.service';
import { Course } from '../model/course';
import { first } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Módulos do Angular Material
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseFormComponent implements OnInit { // Renomeado para seguir a convenção

  form!: FormGroup; // Adicionado '!' para inicialização no construtor
  private readonly snackBar = inject(MatSnackBar);
  durationInSeconds = 3000;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CoursesServices,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Pega os dados da rota (se houver) para verificar se é edição
    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
      // Adicionado id para a edição
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]]
    });
  }

  onSubmit(): void {
    this.service.save(this.form.value).pipe(first()).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError()
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Salvo com sucesso!', '', { duration: this.durationInSeconds });
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar', '', { duration: this.durationInSeconds });
  }

  getErrorMessage(fieldName: string): string | null {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return `O campo ${fieldName} é obrigatório.`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O campo ${fieldName} precisa ter no mínimo ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `O campo ${fieldName} pode ter no máximo ${requiredLength} caracteres.`;
    }

    return null;
  }
}
