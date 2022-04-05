import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GreenTextDirective } from './core/directives/greentext.directive';
import { FixNumPipe } from './core/pipes/fixnum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GreenTextDirective,
    FixNumPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
