import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Turma } from '../../../../models/turma/turma';
import { TurmaService } from '../../../../services/turma/turma.service';
import { TurmaFormComponent } from '../turma-form/turma-form.component';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, TurmaFormComponent],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss',
})
export class TurmaListComponent {
  lista: Turma[] = [];
  turmaEdit!: Turma;
  turmaService = inject(TurmaService);
  searchTerm = '';

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaForm') modalTurmaForm!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.turmaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  new() {
    this.turmaEdit = new Turma();
    this.modalRef = this.modalService.open(this.modalTurmaForm, {
      modalClass: 'modal-xl',
    });
  }

  edit(turma: Turma) {
    this.turmaEdit = turma;
    this.modalRef = this.modalService.open(this.modalTurmaForm, {
      modalClass: 'modal-md',
    });
  }

  myCustomEvent(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

  delete(id: number) {
    if (confirm('Deseja deletar isso aí?')) {
      this.turmaService.deleteById(id).subscribe({
        next: (listaRetornada) => {
          this.findAll();
        },
        error: (erro) => {},
      });
    }
  }
}
