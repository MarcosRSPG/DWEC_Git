import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public authService: LoginService,
    private router: Router,
  ) {}

  async logout() {
    const success = await this.authService.logout();
    if (success) {
      this.router.navigate(['/login']);
    }
  }
}
