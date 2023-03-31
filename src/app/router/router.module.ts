import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { ContactComponent } from './../components/contact/contact.component'
import { ComicsComponent } from '../components/comics/comics.component'

const routes: Routes = [
  { path: '', component: ComicsComponent },
  { path: 'contact', component: ContactComponent }
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class Router {}
