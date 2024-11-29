import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { BiochimieComponent } from './components/biochimie/biochimie.component';
import { MathphysComponent } from './components/mathphys/mathphys.component';
import { LanguesComponent } from './components/langues/langues.component';
import { ConcoursComponent } from './components/concours/concours.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mathphys', component: MathphysComponent },
  { path: 'biochimie', component: BiochimieComponent },
  { path: 'langues', component: LanguesComponent },
  { path: 'concours', component: ConcoursComponent},
  { path: 'contact', component: ContactComponent },
];
