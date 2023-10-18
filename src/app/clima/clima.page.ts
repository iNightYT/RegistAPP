import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  weatherTemp: any;
  todayDate = new Date()
  nombre: any;
  weatherIcon: any;
  weatherDetails: any;

  constructor(public httpCLient: HttpClient) {
    this.cargarDatos();
  }

  cargarDatos() {
    this.httpCLient.get('https://api.openweathermap.org/data/2.5/weather?lat=-33.6855420543528&lon=-71.21461721073071&appid=11be1f506a0d667bfa4ff0911b014f86').subscribe((results: any) => {
      console.log(results);
      this.weatherTemp = results['main']
      console.log(this.weatherTemp);
      this.nombre = results['name']
      console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0]
      console.log(this.weatherDetails);
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
    });
  }

  
  ngOnInit() {
  }
}