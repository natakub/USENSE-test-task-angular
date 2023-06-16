import { Component } from '@angular/core';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PasswordComponent],
  template: ` <main>
    <section class="content">
      <form>
        <app-password></app-password>
      </form>
    </section>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'password';
}
