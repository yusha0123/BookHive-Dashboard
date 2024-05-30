import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <aside class="inset-y-0 w-60 z-10 hidden fixed md:block border-r">
      <app-sidebar />
    </aside>
    <main class="md:pl-60 pl-0">
      <app-navbar />
      <router-outlet />
    </main>
  `,
})
export class LayoutComponent {}
