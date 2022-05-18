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
    url("https://raw.githubusercontent.com/gist/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40/raw/e1e4a92f6072d15014f19aa8903d24a1ac0c41a4/nyan-cat.gif")
    left top
    no-repeat
  `
    })
  }

}
