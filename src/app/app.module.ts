import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {
  NgbCollapseModule,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { QuizwithparticipantsComponent } from './components/quizwithparticipants/quizwithparticipants.component';
import { RoompageComponent } from './components/roompage/roompage.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { EditRoompageComponent } from './components/editroompage/editroompage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SidebarComponent,
    QuizesComponent,
    QuizwithparticipantsComponent,
    QuizwithparticipantsComponent,
    RoompageComponent,
    EditRoompageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    NavbarComponent,
    HttpClientModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    // SidebarComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
