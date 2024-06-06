import { FormBuilder } from '@angular/forms';
import { SemilleroService } from '../../services/semillero.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-semilleros',
  templateUrl: './semillero.component.html',
  styleUrls: ['./semillero.component.css']
})
export class SemilleroComponent {
  titlePage: string = 'Semilleritos';
  semilleroList: any = [];
  semilleroForm: any = this.formBuilder.group({
    codigo: '',
    liderSemillero: '',
    nombreSemillero: '',
    descripcion: '',
    fechaCreacion: '',
    facultad: '',
    integrantes: [],
  })
  editableSemillero: boolean = false;
  idSemillero: any;
  user = 'Semilleros';


  constructor(private semilleroService: SemilleroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {


  }
  ngOnInit() {
    this.getAllLideres();
  }


  getAllLideres() {
    this.semilleroService.getAllLideresData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.semilleroList = data
      }
    );
  }

  newAnimalEntry() {
    this.semilleroService.newAnimal(localStorage.getItem('accessToken'), this.semilleroForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/animal']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }


  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  updateAnimalEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.semilleroForm.value) {
      if (this.semilleroForm.value[key] === '') {
        this.semilleroForm.removeControl(key);
      }
    }
    this.semilleroService.updateAnimal(localStorage.getItem('accessToken'), this.idSemillero, this.semilleroForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal editado");
      }
    );
  }

  toggleEditAnimal(id: any) {
    this.idSemillero = id;
    console.log(this.idSemillero)
    this.semilleroService.getOneAnimal(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.semilleroForm.setValue({
          nombre: data.nombre,
          correo: data.correo,
          clave: data.clave,
          cedula: data.cedula,
        });
      }
    );
    this.editableSemillero = !this.editableSemillero;
  }

  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    //separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';

    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }
    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }
    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    return finalDate;
  }

  deleteAnimalEntry(id: any) {
    console.log(id)
    this.semilleroService.deleteAnimal(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Lider de semillero eliminado");
      }
    );
  }
}
