import { Component, OnInit } from '@angular/core';
import { OpenAqServiceService } from 'src/app/services/open-aq-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public country: string;
  public allCountries = [];

  constructor(
    private openAqService: OpenAqServiceService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.country = 'France';
    this.getAllCountries();
  }

  public searchCountry(country): void {
    this.allCountries.forEach(element => {
      if (country === element.name || country === element.code) {
        this.country = element.code;
        this.router.navigate(['/map', this.country]);
      }
    });
  }

  private getAllCountries(): void{
    this.openAqService.getAllCountry().subscribe( data => {
      data.results.forEach(element => {
        this.allCountries.push(
          {
            code: element.code,
            name: element.name,
          }
        );
      });
    });
  }
}
