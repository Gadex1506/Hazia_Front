import { FormBuilder } from '@angular/forms';
import { LiderService } from './../../services/lider.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-animal',
  templateUrl: './lider.component.html',
  styleUrls: ['./lider.component.css']
})
export class LiderComponent {
  titlePage: string = 'lideres';
  animalList: any = [];
  liderForm: any = this.formBuilder.group({
    nombre: '',
    correo: '',
    clave: '',
    cedula: '',
  })
  editableAnimal: boolean = false;
  idAnimal: any;
  user = 'Lider de Semillero';


  constructor(private animalService: LiderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {


  }
  ngOnInit() {
    this.getAllLideres();
  }


  getAllLideres() {
    this.animalService.getAllLideresData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.animalList = data
      }
    );
  }

  newAnimalEntry() {
    this.animalService.newAnimal(localStorage.getItem('accessToken'), this.liderForm.value).subscribe(
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
    for (let key in this.liderForm.value) {
      if (this.liderForm.value[key] === '') {
        this.liderForm.removeControl(key);
      }
    }
    this.animalService.updateAnimal(localStorage.getItem('accessToken'), this.idAnimal, this.liderForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal editado");
      }
    );
  }

  toggleEditAnimal(id: any) {
    this.idAnimal = id;
    console.log(this.idAnimal)
    this.animalService.getOneAnimal(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.liderForm.setValue({
          nombre: data.nombre,
          correo: data.correo,
          clave: data.clave,
          cedula: data.cedula,
        });
      }
    );
    this.editableAnimal = !this.editableAnimal;
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
    this.animalService.deleteAnimal(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Lider de semillero eliminado");
      }
    );
  }
}
