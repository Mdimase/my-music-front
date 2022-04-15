import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string='';  //mensaje de error ante un mal login
  loginForm!: FormGroup;  
  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService){
      this.loginForm = this.initForm();
     }

  ngOnInit(): void {
    //reset login status
    this.authenticationService.logout();
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      email: ['',[Validators.required,Validators.minLength(5),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}'),],],
      password: ['',[Validators.required,Validators.minLength(3)],]
    });
  }

  // recibe un campo y determina si esta invalido o no
  // touched sera true si se ingreso al campo input
  // dirty sera true si se singreso al campo input y se ingreso algo
  isInvalidField(field: string):boolean {
    const fieldName = this.loginForm.get(field);
    return fieldName!.invalid && (fieldName!.touched || fieldName!.dirty);
  }

  getMin(field:string):number{
    return this.loginForm.get(field)?.errors?.['minlength'].requiredLength; 
  }

  onSubmit() {
    const email:String = this.loginForm.get('email')?.value;
    const password:String = this.loginForm.get('password')?.value;
    this.authenticationService.login(email,password)
      .subscribe({
        next:(data) => {  //body del response
          this.router.navigate(['playlists']);  //lleva al usuario a la vista de playlists
        },
        error:(e) => {  // email/password incorrectos
          this.error = 'email/password incorrectos';
        }});
  }
}
