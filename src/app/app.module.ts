import { Router } from './router/router.module'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'

import { ToastrModule } from 'ngx-toastr'
import { GoogleMapsModule } from '@angular/google-maps'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { ComicsComponent } from './components/comics/comics.component'
import { HeaderComponent } from './components/header/header.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material/dialog'
import { DialogComponent } from './components/dialog/dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BannerComponent } from './components/banner/banner.component'
import { FooterComponent } from './components/footer/footer.component'
import { EventsComponent } from './components/events/events.component'
import { ContactComponent } from './components/contact/contact.component'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [
    AppComponent,
    ComicsComponent,
    HeaderComponent,
    DialogComponent,
    BannerComponent,
    FooterComponent,
    EventsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Router,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    GoogleMapsModule,
    GooglePlaceModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
    }),
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
