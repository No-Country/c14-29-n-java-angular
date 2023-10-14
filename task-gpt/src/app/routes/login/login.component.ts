import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  onSubmit(){
    console.log('Boton');
  }

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/),
  ]);

  ngOnInit(): void {

  }

  passwordForm: FormGroup = new FormGroup(
    {
      password: this.password,
    }
  );



  hidePasswordButton = true;


  onPasswordInput(password: string) {}


}


