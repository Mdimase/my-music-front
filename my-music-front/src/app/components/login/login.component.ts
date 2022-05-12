import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';  //mensaje de error ante un mal login

  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
  // dirty sera true si se singreso al campo input y se ingreso algo
  isInvalidField(field: string): boolean {
    const fieldName = this.loginForm.get(field);
    return fieldName!.invalid && (fieldName!.touched || fieldName!.dirty);
  }

  getMin(field: string): number {
    return this.loginForm.get(field) ?.errors ?.['minlength'].requiredLength;
  }

  onSubmit() {
    const email: string = this.loginForm.get('email') ?.value;
    const password: string = this.loginForm.get('password') ?.value;
    this.authenticationService.login(email, password)
      .subscribe({
        next: (data) => {  // login exitoso
          this.LoginModal.fire({
            icon: 'success',
            title: 'Signed in successfully!'
        })
          this.router.navigate(['music/playlists']);  //lleva al usuario a la vista de playlists
        },
        error: (e) => {  // email/password incorrectos
          this.LoginModal.fire({
            icon: 'error',
            title: 'Wrong Sign in!'
        })
          this.error = 'email/password incorrectos';
        }
      });
  }

  LoginModal = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  showConstructionModal() {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Still on construction',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
