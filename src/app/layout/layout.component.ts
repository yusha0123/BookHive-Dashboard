import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <div class="inset-y-0 w-60 z-10 hidden fixed md:block border-r">
      <app-sidebar />
    </div>
    <main class="md:pl-60 pl-0">
      <app-navbar />
      <router-outlet />
    </main>
  `,
})
export class LayoutComponent {}
