import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;

  usuarios: any[];

 // onSubmit(){
    //console.log('Boton');
 // }

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

  constructor(private userService: UserService) {
    this.userService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  autenticar() {
    if (Array.isArray(this.usuarios)) {

    const usuarioEncontrado = this.usuarios.find(user => user.email === this.email && user.password === this.password);

    if (usuarioEncontrado) {
      alert(this.usuarios);
      // Autenticación exitosa, realiza las acciones necesarias
    } else {
      console.log('no');// Autenticación fallida, muestra un mensaje de error
    }
  }


}



}
