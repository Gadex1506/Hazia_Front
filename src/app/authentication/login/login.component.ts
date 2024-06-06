import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.document.body.classList.add('bg-gradient-primary');
  }

  onLogin(form: any): void {
    this.authenticationService.login(form.value).subscribe(
      (res) => {

        localStorage.setItem('accessToken',JSON.parse(JSON.stringify(res)).accessToken);
        localStorage.setItem('rol', JSON.parse(JSON.stringify(res)).rol);

        const rol = localStorage.getItem('rol');
        
        if (rol == '1') {
          console.log('Rol de Admin');
          this.router.navigateByUrl('/animal');
        }else if (rol == '2') {
          console.log('Rol de Lider');
          this.router.navigateByUrl('/liderSemillero');
        }else if (rol == '3') {
          console.log('Rol de Estudiante');
        }
        
      }
    );
  }
}
