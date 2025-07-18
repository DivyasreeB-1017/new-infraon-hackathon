import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConfigCardsComponent } from './config-cards/config-cards.component';
import { CommonComponentComponent } from './common-component/common-component.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ConfigCardsComponent,
    CommonComponentComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
