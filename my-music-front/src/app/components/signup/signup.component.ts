import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  modalRef: MdbModalRef<TermsandconditionsComponent> | null = null;

  constructor(public modalService: MdbModalService) { }

  config = {
    backdrop: true,
    modalClass: 'modal-dialog-scrollable modal-xl'
  }

  openModal() {
    this.modalRef = this.modalService.open(TermsandconditionsComponent, this.config);
  }

  showConstructionModal() {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'On construction here too',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
