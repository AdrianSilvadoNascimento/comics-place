import { DialogComponent } from './../dialog/dialog.component'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { ComicService } from './../../services/comic.service'
import { finalize } from 'rxjs'

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comics: any
  characters: any
  hqName: string
  isLoading: boolean = false

  constructor(
    private comicService: ComicService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchComics()
    this.fetchCharacters()
  }

  fetchComics() {
    this.isLoading = true
    this.comicService.fetchComic()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(result => {
        this.comics = result
        console.log(result)
      })
  }

  fetchCharacters() {
    this.isLoading = true
    this.comicService.fetchCharacters().subscribe(result => {
      this.characters = result
      console.log(result)
    })
  }

  openDialog(id: string): void {
    this.dialog.open(DialogComponent, {
      data: { comicId: id }
    })
  }

  searchHQ(characterName?: string) {
    const filtered = this.comics.data.results.filter((comic: any) => {
      if (!characterName?.length) {
        if (comic.title.includes(this.hqName)){
          return comic
        }
      } else {
        if (comic?.characters?.items.length) {
          return comic.characters.items.filter((character: any) => character.name.includes(characterName))
        }
      }
    })

    console.log(filtered)
  }
}
