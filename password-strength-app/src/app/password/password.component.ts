import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label for="password">Password: </label>
    <input id="password" type="password" [formControl]="password" />

    <div class="password-strength">
      <div
        class="strength-section"
        [ngClass]="getSectionClass(strengthLevel, 0)"
      ></div>
      <div
        class="strength-section"
        [ngClass]="getSectionClass(strengthLevel, 1)"
      ></div>
      <div
        class="strength-section"
        [ngClass]="getSectionClass(strengthLevel, 2)"
      ></div>
    </div>

    <p>Value: {{ password.value }}</p>
  `,
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent {
  password = new FormControl('', [Validators.required]);
  strengthLevel: 'empty' | 'short' | 'easy' | 'medium' | 'strong' = 'empty';

  constructor() {
    this.password!.valueChanges.subscribe((value) => {
      this.calculateStrength(value || '');
    });
  }

  calculateStrength(passwordValue: string) {
    const password = passwordValue.trim();
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSymbols = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password);

    if (!password || password === '') {
      this.strengthLevel = 'empty';
    } else if (password.length < 8) {
      this.strengthLevel = 'short';
    } else if (hasLetters && hasDigits && hasSymbols) {
      this.strengthLevel = 'strong';
    } else if (
      (hasLetters && hasDigits) ||
      (hasSymbols && hasLetters) ||
      (hasDigits && hasSymbols)
    ) {
      this.strengthLevel = 'medium';
    } else {
      this.strengthLevel = 'easy';
    }
  }

  getSectionClass(strengthLevel: string, index: number): string {
    switch (strengthLevel) {
      case 'empty':
        return 'gray';
        break;
      case 'short':
        return 'red';
        break;
      case 'easy':
        return index === 0 ? 'red' : 'gray';
        break;
      case 'medium':
        return index <= 1 ? 'yellow' : 'gray';
        break;
      case 'strong':
        return 'green';
        break;
      default:
        return 'gray';
    }
  }
}
