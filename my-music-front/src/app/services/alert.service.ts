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

  constructor(){}

  success(title:string):void{
    this.Alert.fire({
      title:title
    })
  }

}
