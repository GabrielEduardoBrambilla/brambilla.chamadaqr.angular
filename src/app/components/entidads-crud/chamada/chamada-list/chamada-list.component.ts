import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Chamada } from '../../../../models/chamada/chamada';
import { ChamadaService } from '../../../../services/chamada/chamada.service';
import { ChamadaFormComponent } from '../../chamada/chamada-form/chamada-form.component';
import { TurmaListComponent } from '../../turma/turma-list/turma-list.component';

@Component({
  selector: 'app-chamada-list',
  standalone: true,
  imports: [
    FormsModule,
    MdbModalModule,
    CommonModule,
    ChamadaFormComponent,
    MdbCheckboxModule,
    TurmaListComponent,
  ],
  templateUrl: './chamada-list.component.html',
  styleUrl: './chamada-list.component.scss',
})
export class ChamadaListComponent {
  lista: Chamada[] = [];
  chamadaEdit!: Chamada;

  searchTerm = '';

  chamadaService = inject(ChamadaService);
  modalService = inject(MdbModalService);

  @Input('currentSelectedChamadas') currentSelectedChamadas: Chamada[] = [];
  @Input('isTurmaSelect') isTurmaSelect: boolean = false;
  @ViewChild('modalChamadaForm') modalChamadaForm!: TemplateRef<any>;
  @ViewChild('modalTurmaSelectChamadaForm')
  modalTurmaSelectChamadaForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  @Output() confirm = new EventEmitter<Chamada[]>();

  constructor() {
    // this.selectedChamadas = this.currentSelectedChamadas;
    this.findAll();
  }

  selectTurma() {
    this.chamadaEdit = new Chamada();
    this.modalRef = this.modalService.open(this.modalTurmaSelectChamadaForm, {
      modalClass: 'modal-md',
    });
  }

  isChamadaSelected(chamada: Chamada): boolean {
    const isSelected = this.currentSelectedChamadas.some(
      (selected) => selected.id === chamada.id
    );
    // isSelected ? this.selectChamadaTurma(chamada) : false;
    return isSelected;
  }

  findAll() {
    this.chamadaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  new() {
    this.chamadaEdit = new Chamada();
    this.modalRef = this.modalService.open(this.modalChamadaForm, {
      modalClass: 'modal-md',
    });
    console.log('Entrou');
  }

  edit(chamada: Chamada) {
    this.chamadaEdit = chamada;
    this.modalRef = this.modalService.open(this.modalChamadaForm, {
      modalClass: 'modal-md',
    });
  }

  myCustomEvent(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

  delete(id: number) {
    if (confirm('Deseja deletar isso aí?')) {
      this.chamadaService.deleteById(id).subscribe({
        next: (listaRetornada) => {
          this.findAll();
        },
        error: (erro) => {},
      });
    }
  }
}
