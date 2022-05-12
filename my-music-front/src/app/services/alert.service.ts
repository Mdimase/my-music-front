import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  Alert = Swal.mixin({
    position: 'top-end',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  })

  LoginToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(){}

  success(title:string):void{
    this.Alert.fire({
      title:title
    });
  }

  info(title:string):void{
    this.Alert.fire({
      title:title,
      icon:'info'
    });
  }

  toastSuccess(title:string){
    this.LoginToast.fire({
      title:title,
      icon:'success'
    });
  }

  toastError(title:string){
    this.LoginToast.fire({
      title:title,
      icon:'error'
    });
  }

}
