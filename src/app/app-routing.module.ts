import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';
import { ChatComponent } from './chat/chat.component';
import { routeguardGuard } from './routeguard.guard';

const routes: Routes = [
  {path: '', component:UploadPdfComponent},
  {path: 'chat', component:ChatComponent, canActivate:[routeguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
