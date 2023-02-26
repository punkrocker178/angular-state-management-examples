import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello from {{name}}!</h1>
    <app-a></app-a>
    <app-b></app-b>
    <app-c></app-c>
  `,
})
export class AppComponent {
  name = 'Angular';
}
