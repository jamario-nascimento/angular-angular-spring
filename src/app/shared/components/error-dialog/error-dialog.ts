// src/app/shared/components/error-dialog/error-dialog.component.ts
import { Component, Inject } from '@angular/core';

// Imports diretos do Angular Material
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Se você estiver usando um ícone, importe também
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatDialogModule, // Este módulo já inclui MatDialogTitle e MatDialogContent
    MatButtonModule, // Se você tiver um botão de "fechar" no seu HTML
    // MatIconModule // Se você estiver usando ícones
  ],
  standalone: true,
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss',
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string }
  ) {}
}
