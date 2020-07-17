import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HelloWorldRestControllerService } from 'src/generated-backend/services/hello-world-rest-controller.service';

import { Greeting } from 'src/generated-backend/models/greeting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent {
  //   hello:Observable<Object>
  //   constructor(private httpClient: HttpClient) { 
  //     this.hello = this.httpClient.get(`http://localhost:8080/api/hello`);
  //    }

  hello:Observable<Greeting>
  constructor(private greetingService: HelloWorldRestControllerService) { 
    this.hello = this.greetingService.hello({
        name:'Thomas'
    });
  }
}
