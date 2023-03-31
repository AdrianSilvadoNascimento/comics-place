import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core'

import { ComicService } from './../../services/comic.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any
  isLoading: boolean = false

  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.fetchEvents()
  }

  /**
   * Fetch the events to show.
   */
  fetchEvents() {
    this.isLoading = true
    this.comicService.fetchEvents()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(results => {
        this.events = results
        console.log('events:', this.events)
      })
  }
}
