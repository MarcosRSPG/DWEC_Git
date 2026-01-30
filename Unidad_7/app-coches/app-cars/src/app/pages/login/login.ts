import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: LoginService,
    private router: Router,
  ) {}

  async login() {
    try {
      this.error = '';
      if (!this.username || !this.password) {
        this.error = 'Por favor completa todos los campos';
        return;
      }

      await this.authService.login(this.username, this.password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}
