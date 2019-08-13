import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../validators/CustomValidator';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpService } from '../services/HttpService';

export interface Usuario {
  userIdentification: string;
  userTypeiden: string;
  userName: string;
  userLastname: string;
  userEmail: string;
  userPhone: string;
  userCellphone: string;
  userAddress: string;
  userGender: string;
  userBirthday: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  users: Usuario[];
  cols: any[];

  constructor(private formBuilder: FormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      type_indetificacion: ['', Validators.required],
      identificacion: ['', [Validators.required, CustomValidator.numberValidator]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    })

    let myHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    var httpOptions = {
      headers: myHeaders
    };
    this.http.get(environment.user_list, httpOptions)
      .subscribe(res => {
        this.users = res;
      }, err => {
        console.log(err);
      });

    this.cols = [
      { field: 'userIdentification', header: 'Identificacion' },
      { field: 'userTypeiden', header: 'Tipo de Identificacion' },
      { field: 'userName', header: 'Nombre' },
      { field: 'userEmail', header: 'Email' },
      { field: 'userCellphone', header: 'Celular' },
    ];

  }

  // Método uqe permite acceder de mejor manera los los valores de lo elementos
  get f() { return this.registerForm.controls; }

  //Metodo que permite enviar la informacion al servicio
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  //Metodo quqe permite resetear el formulario
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
