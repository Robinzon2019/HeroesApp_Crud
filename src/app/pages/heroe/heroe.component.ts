import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../models/heroe.model';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar( formulario: NgForm ){

    if(formulario.invalid){
      console.log("Formulario no valido");
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }
    else{
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actializó correctamente',
        icon: 'success'
      });
    });

  }

}
