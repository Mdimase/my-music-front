import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {TermsandconditionsComponent} from '../termsandconditions/termsandconditions.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  modalRef: MdbModalRef<TermsandconditionsComponent> | null = null;

  constructor(public modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(TermsandconditionsComponent, {
      modalClass: 'modal-dialog-scrollable modal-xl'
    });
  }
}
