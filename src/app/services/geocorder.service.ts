import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { GeocoderResponse } from '../model/geocode-response.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  private readonly URL = 'https://maps.google.com/maps/api/geocode/json'

  geocodeLatLng(location: google.maps.LatLngLiteral): Promise<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'location': location }, (results, status) => {
        if (results) {
          const response = new GeocoderResponse(status, results)
          resolve(response)
        }
      })
    })
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    const url = `${this.URL}?address=${term}&sensor=false&key=${environment.googleApiKey}`
    return this.http.get<GeocoderResponse>(url)
  }
}
