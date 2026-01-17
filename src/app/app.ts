import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTable } from "./features/periodic-table/periodic-table";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PeriodicTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('QuimicaN3Angular');
}
