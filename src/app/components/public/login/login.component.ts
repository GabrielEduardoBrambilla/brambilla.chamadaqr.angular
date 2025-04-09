import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);

  logar() {
    if (this.login.username == 'admin' && this.login.password == '123') {
      this.router.navigate(['app/professor']);
    } else if (this.login.username == 'user' && this.login.password == '123') {
      this.router.navigate(['/aluno']);
    } else alert('não de ucerto');
  }
}
