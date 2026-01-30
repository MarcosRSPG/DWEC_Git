import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  constructor(
    public authService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn() && !this.router.url.includes('login')) {
      this.router.navigate(['/login']);
    }
  }
}
