import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {TaskComponent} from './users/task.component';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from "@angular/material/table";
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HeaderComponent,
    StartPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
