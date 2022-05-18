import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';  //mensaje de error ante un mal login

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertService:AlertService,
    private authenticationService: AuthenticationService) {
    this.loginForm = this.initForm();
  }

  ngOnInit(): void {
    //reset login status
    this.authenticationService.logout();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5),
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}'),],],
      password: ['', [Validators.required, Validators.minLength(3)],]
    });
  }

  // recibe un campo y determina si esta invalido o no
  // touched sera true si se ingreso al campo input
  // dirty sera true si se ingreso al campo input y se ingreso algo
  isInvalidField(field: string): boolean {
    const fieldName = this.loginForm.get(field);
    return fieldName!.invalid && (fieldName!.touched || fieldName!.dirty);
  }

  // determina si un campo contiene errores
  showError(field:string,error:string):boolean{
    return this.loginForm.get(field)?.errors?.[error] && this.isInvalidField(field);
  }

  // valor minimo de caracteres
  getMin(field: string): number {
    return this.loginForm.get(field) ?.errors ?.['minlength'].requiredLength;
  }

  onSubmit() {
    const email: string = this.loginForm.get('email') ?.value;
    const password: string = this.loginForm.get('password') ?.value;
    this.authenticationService.login(email, password)
      .subscribe({
        next: (data) => {  // login exitoso
          this.alertService.toastSuccess('Signed in successfully!');
          this.router.navigate(['music/playlists']);  //lleva al usuario a la vista de playlists
        },
        error: (e) => {  // email/password incorrectos
          this.alertService.toastError('Wrong Sign in!');
        }
      });
  }

  showConstructionModal() {
    this.alertService.info('Still on construction');
  }
}
