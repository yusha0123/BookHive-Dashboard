import { Component } from '@angular/core';
import { Router, IsActiveMatchOptions } from '@angular/router';
import {
  faUsers,
  faChartPie,
  faBoxOpen,
  IconDefinition,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  faUsers = faUsers;
  faChartPie = faChartPie;
  faBoxOpen = faBoxOpen;
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private router: Router) {}

  navLinks: { route: string; label: string; icon: IconDefinition }[] = [
    { route: '/', label: 'Dashboard', icon: faChartPie },
    { route: '/products', label: 'Products', icon: faBoxOpen },
    { route: '/users', label: 'Users', icon: faUsers },
  ];

  isLinkActive(route: string): boolean {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    };
    return this.router.isActive(route, matchOptions);
  }
}
