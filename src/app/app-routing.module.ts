import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', component:UploadPdfComponent},
  {path: 'chat', component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
