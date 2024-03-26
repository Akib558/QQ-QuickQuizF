import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { QuizwithparticipantsComponent } from './components/quizwithparticipants/quizwithparticipants.component';
import { RoompageComponent } from './components/roompage/roompage.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'quizes',
    component: QuizesComponent,
  },
  {
    path: 'quizwithparticipants',
    component: QuizwithparticipantsComponent,
  },

  {
    path: 'roompage',
    component: RoompageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
