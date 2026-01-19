import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { Login } from "./features/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('QuimicaN3Angular');
}
