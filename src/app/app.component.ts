import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  providers: [GeneralService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'specific';
  constructor(private generalService: GeneralService) {
    this.generalService.loadPermission();
  }
}
