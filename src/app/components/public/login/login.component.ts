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
    this.loginService.logar(this.login).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // O token já foi salvo automaticamente pelo LoginService

        this.gerarToast().fire({ icon: 'success', title: 'Seja bem-vindo!' });

        // Redirecionar baseado na role
        if (this.loginService.hasRole('PROFESSOR')) {
          this.router.navigate(['professor']);
        } else if (this.loginService.hasRole('ALUNO')) {
          this.router.navigate(['aluno']);
        } else {
          this.router.navigate(['home']);
        }
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
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
