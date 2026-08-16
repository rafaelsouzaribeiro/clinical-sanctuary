import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  viewProviders:[Title],
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private title: Title) {
        this.title.setTitle('Login - Clinical Sanctuary');
    }
}
