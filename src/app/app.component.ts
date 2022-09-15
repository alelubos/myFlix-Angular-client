import { Component } from '@angular/core';

/**
 * Root Application Component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Application title
   */
  title: string = 'TopFlix';
}
