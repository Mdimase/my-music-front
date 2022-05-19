import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  // gato volador
  showNyanModal() {
    Swal.fire({
      title: 'Esto solo vale un 10, lo demás es relleno :P',
      width: 600,
      padding: '3em',
      color: '#ffffff',
      background: '#fff url(https://c.tenor.com/yu4yJBMcidMAAAAd/space.gif)',
      confirmButtonColor: '#0b9e00',
      confirmButtonText: 'Aprobados',
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://i.gifer.com/PYh.gif")
    left top
    no-repeat
  `
    })
  }

}
