import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}

  private readonly URL = 'http://localhost:3004'

  /**
   * Fetch all the comics to show.
   *
   * @returns - All Comics
   */
  fetchComic() {
    return this.http.get(`${this.URL}/comics`)
  }

  /**
   * Get an unique HQ.
   *
   * @param {string} comicId - The desired HQ.
   * @returns - The desired HQ.
   */
  getSpecificComic(comicId: string) {
    return this.http.get(`${this.URL}/comics/uniqueComic/${comicId}`)
  }

  /**
   * Fetch all characters.
   * @returns - all characters.
   */
  fetchCharacters() {
    return this.http.get(`${this.URL}/characters`)
  }

  fetchEvents() {
    return this.http.get(`${this.URL}/events`)
  }
}
