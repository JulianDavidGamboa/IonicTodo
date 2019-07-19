import { Component, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { listaItem } from 'src/app/models/lista-item.model';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @ViewChild(IonList)list: IonList;

  lista: Lista;
  nombreItem = '';

  constructor( private deseosService: DeseosService, 
              private route: ActivatedRoute ) { 
    
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);

    console.log(listaId);
  
  }

  ngOnInit() {
  }

  agregarItem() {

    if( this.nombreItem.length === 0 ) {
      return;
    }

    const nuevoItem = new listaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.deseosService.guardarStorage()

  }

  cambioCheck( item: listaItem ){

    const pendientes = this.lista.items
              .filter( itemData => !itemData.completado)
              .length;

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();

    console.log(this.deseosService.listas);
  }

  borrar(i: number) {
    this.lista.items.splice(i, i);
    this.list.closeSlidingItems();
    this.deseosService.guardarStorage();
  }

}
