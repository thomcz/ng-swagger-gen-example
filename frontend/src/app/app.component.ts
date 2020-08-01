import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HelloWorldRestControllerService } from 'src/generated-backend/services/hello-world-rest-controller.service';

import { Greeting } from 'src/generated-backend/models/greeting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hello: Observable<Greeting>
  constructor(private greetingService: HelloWorldRestControllerService) {
    this.hello = this.greetingService.hello({
      name: 'Thomas'
    });
  }
}
