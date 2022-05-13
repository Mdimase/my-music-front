import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: string = '';  //mensaje de error ante un mal registro

  modalRef: MdbModalRef<TermsandconditionsComponent> | null = null;

  signupForm!: FormGroup;

  constructor(public modalService: MdbModalService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signupService: SignupService) {
    this.signupForm = this.initForm();
  }

  ngOnInit(): void { }

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
    const fieldName = this.signupForm.get(field);
    return fieldName!.invalid && (fieldName!.touched || fieldName!.dirty);
  }

  showError(field: string, error: string): boolean {
    return this.signupForm.get(field) ?.errors ?.[error] && this.isInvalidField(field);
  }

  getMin(field: string): number {
    return this.signupForm.get(field) ?.errors ?.['minlength'].requiredLength;
  }

  onSubmit() {
    const email: string = this.signupForm.get('email') ?.value;
    const password: string = this.signupForm.get('password') ?.value;
    this.signupService.addNewUser(email, password)
      .subscribe({
        next: (data) => {  // registro exitoso
          this.alertService.toastSuccess('Registered successfully!');
          this.router.navigate(['/auth']);  //lleva al usuario a la vista de login
        },
        error: (e) => {  // email/password incorrectos
          this.alertService.toastError('Something went wrong!');
        }
      });
  }

  config = {
    backdrop: true,
    modalClass: 'modal-dialog-scrollable modal-xl'
  }

  openModal() {
    this.modalRef = this.modalService.open(TermsandconditionsComponent, this.config);
  }
  
  showConstructionModal() {
    this.alertService.info('On construction here too');
  }
}
