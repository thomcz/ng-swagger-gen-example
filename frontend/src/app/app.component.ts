import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent {
    hello:Observable<Object>
    constructor(private httpClient: HttpClient) { 
      this.hello = this.httpClient.get(`http://localhost:8080/api/hello`);
     }
}
