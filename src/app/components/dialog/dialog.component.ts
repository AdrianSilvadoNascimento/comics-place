import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { finalize } from 'rxjs'
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps'
import { ToastrService } from 'ngx-toastr'

import { ComicService } from './../../services/comic.service'
import { GeocoderResponse } from '../../model/geocode-response.model'
import { GeocodingService } from '../../services/geocorder.service'
import { Options } from 'ngx-google-places-autocomplete/objects/options/options'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  template: 'passed in {{ data.comicId }}',
})
export class DialogComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  address: string
  mapZoom: number = 12
  mapCenter: google.maps.LatLng
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  }
  markerInfoContent = ''
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  }

  geocoderWorking = false
  geolocationWorking = false
  formattedAddress?: string | null = null
  locationCoords?: google.maps.LatLng | null = null

  comicModel: any
  formattedAdress: string = ''
  isLoading: boolean = false
  isBuy: boolean = false
  options = {
    types: ['address'],
    componentRestrictions: { country: 'BR' },
  } as Options

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { comicId: string },
    private comicService: ComicService,
    private geocodingService: GeocodingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getComic()
  }

  /**
   * Check if the geocoding service is working.
   *
   * @returns {boolean} - If the geocoding is working
   */
  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking
  }

  /**
   * Find the position searched by the user.
   */
  findAddress(): void {
    if (!this.address || this.address.length === 0) {
      return
    }

    this.geocoderWorking = true
    this.geocodingService
      .getLocation(this.address)
      .pipe(finalize(() => this.geocoderWorking = false))
      .subscribe((response: GeocoderResponse) => {
        if (response.status === 'OK' && response.results?.length) {
          const location = response.results[0]
          const loc: any = location.geometry.location

          this.locationCoords = new google.maps.LatLng(loc.lat, loc.lng)

          this.mapCenter = location.geometry.location

          setTimeout(() => {
            if (this.map !== undefined) {
              this.map.panTo(location.geometry.location)
            }
          }, 500)

          this.address = location.formatted_address
          this.formattedAddress = location.formatted_address
          this.markerInfoContent = location.formatted_address

          this.markerOptions = {
            draggable: true,
            animation: google.maps.Animation.DROP,
          }
        } else {
          this.toastr.error(response.error_message, response.status)
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Something went error', err)
      }
    )
  }

  /**
   * To get the current user's position.
   */
  getCurrentAddress(): void {
    this.geolocationWorking = true
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocationWorking = false

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        this.geocoderWorking = true
        this.geocodingService
          .geocodeLatLng(point)
          .then((response: GeocoderResponse) => {
            if (response.status === 'OK' && response.results?.length) {
              const value = response.results[0]

              this.locationCoords = new google.maps.LatLng(point)

              this.mapCenter = new google.maps.LatLng(point)
              this.map.panTo(point)

              this.address = value.formatted_address
              this.formattedAddress = value.formatted_address
              this.markerInfoContent = value.formatted_address

              this.markerOptions = {
                draggable: true,
                animation: google.maps.Animation.DROP,
              }
            } else {
              this.toastr.error(response.error_message, response.status)
            }
          })
          .finally(() => {
            this.geocoderWorking = false
          })
      },
      (error) => {
        this.geolocationWorking = false

        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your position", 'Permission denied')
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your position",
            'Current Position unavailable'
          )
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your position", 'Timed out')
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`)
        }
      },
      { enableHighAccuracy: true }
    )
  }

  /**
   * Open the card with position's informations.
   *
   * @param {MapMarker} marker - The marker to show in the map.
   */
  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker)
  }

  /**
   * Get the address formated.
   */
  handleAddressChange(address: any): void {
    this.formattedAdress = address.formatted_adress
  }

  /**
   * Get the comic's info to show in the modal.
   */
  getComic(): void {
    this.comicService.getSpecificComic(this.data.comicId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(comic => {
        this.comicModel = comic
      })
  }

  /**
   * Send the visual response that the HQ was bought.
   */
  buyHQ() {
    this.isBuy = !this.isBuy
  }
}
