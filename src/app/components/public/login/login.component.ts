import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
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

  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    console.log(this.login);
    console.log(this.login);
    console.log(this.login);
    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        if (token) this.loginService.addToken(token); //MUITO IMPORTANTE

        this.gerarToast().fire({ icon: 'success', title: 'Seja bem-vindo!' });
        this.loginService.hasRole('PROFESSOR')
          ? this.router.navigate(['professor'])
          : this.router.navigate(['aluno']);
      },
      error: (erro) => {
        console.log(erro);
        Swal.fire('Usuário ou senha incorretos!', '', 'error');
      },
    });
  }

  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }
}
