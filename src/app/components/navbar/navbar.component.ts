import { Component } from '@angular/core';
import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;
}
