import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';
import {provideHttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MarkdownModule} from "ngx-markdown";
import { ChatComponent } from './chat/chat.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInput, MatFormField, MatSuffix } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DragNDropDirective,
    UploadPdfComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MarkdownModule.forRoot(),
    MatInput,
    MatFormField,
    MatIconButton,
    MatSuffix,
    MatIcon
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
