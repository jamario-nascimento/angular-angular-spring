import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialog } from './components/error-dialog/error-dialog';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ErrorDialog,MaterialModule],
  exports: [ErrorDialog],
})
export class SharedModule {}
