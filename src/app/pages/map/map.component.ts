import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { OpenAqServiceService } from 'src/app/services/open-aq-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public countryData: any = [];
  private map: any;
  private country: string;

  constructor(
    private openAqService: OpenAqServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.country = params.country;
      this.searchCountry(this.country);
    });
  }

  private initMap(countryData): void {
    this.map = Leaflet.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    for (let i = 0; i < countryData.length; i++) {
      Leaflet.marker([countryData[i].coordinates.latitude, countryData[i].coordinates.longitude])
      .addTo(this.map)
      .bindPopup(
        '<div><h3>City: ' + countryData[i].city +
        '</h3><h4>Location: ' + countryData[i].location +
        '</h4><p>Date: ' + countryData[i].date.utc +
        '</p><p>Parameter: ' + countryData[i].parameter +
        '</p><p>Value: ' + countryData[i].value + ' ' + countryData[i].unit + '</p></div>'
      )
      .openPopup();
    }

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  private searchCountry(country): void{
    this.openAqService.getCountryData(country).subscribe( data => {
      data.results.forEach(element => {
        this.countryData.push(
          {
            country: element.country,
            city: element.city,
            value: element.value,
            coordinates: element.coordinates,
            date: element.date,
            location: element.location,
            parameter: element.parameter,
            unit: element.unit
          }
        );
      });
      this.initMap(this.countryData);
    });
  }
}
