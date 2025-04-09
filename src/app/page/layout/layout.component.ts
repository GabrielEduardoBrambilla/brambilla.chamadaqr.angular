import { Component } from '@angular/core';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
