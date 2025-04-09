import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAdmin = true;

  constructor() {
    // Swal.fire('Hey user!', 'You are the rockstar!', 'info');
  }
}
