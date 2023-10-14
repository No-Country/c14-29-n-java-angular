import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/),
  ]);

  ngOnInit(): void {

  }

  onPasswordInput(password: string) {}

  passwordForm: FormGroup = new FormGroup(
    {
      password: this.password,
    }
  );
}
