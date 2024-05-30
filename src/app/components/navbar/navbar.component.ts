import { Component, Renderer2 } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import {
  faRightFromBracket,
  faBars,
  faUsers,
  faChartPie,
  faBoxOpen,
  IconDefinition,
  faArrowRightFromBracket,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private renderer: Renderer2, private router: Router) {}

  faRightFromBracket = faRightFromBracket;
  faBars = faBars;
  faUsers = faUsers;
  faChartPie = faChartPie;
  faBoxOpen = faBoxOpen;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faXmark = faXmark;
  isOpen: boolean = false;

  toggleNav(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }

  navigateUser(route: string): void {
    this.toggleNav();
    this.router.navigate([route]);
  }

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
