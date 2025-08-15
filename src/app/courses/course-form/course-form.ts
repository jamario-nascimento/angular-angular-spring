import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { Course } from '../model/course';
import { CoursesServices } from '../service/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
export class CourseFormComponent implements OnInit {

  form!: FormGroup;
  private readonly snackBar = inject(MatSnackBar);
  durationInSeconds = 3000;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly service: CoursesServices,
    private readonly location: Location,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
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
