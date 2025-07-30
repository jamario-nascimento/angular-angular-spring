import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { MaterialModule } from '../../material-module';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  imports: [SharedModule,MaterialModule],
  standalone: true,
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss'
})
export class ErrorDialog {

  // O construtor é a chave aqui!
  // Usamos @Inject(MAT_DIALOG_DATA) para receber os dados
  // que foram passados no método `dialog.open()`.
  // Tipar os dados com uma interface é uma boa prática.
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }) { }
}
