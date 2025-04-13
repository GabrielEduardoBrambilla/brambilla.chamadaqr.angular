import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Aluno } from '../../../../models/aluno/aluno';
import { AlunoService } from '../../../../services/aluno/aluno.service';
import { AlunoFormComponent } from '../../aluno/aluno-form/aluno-form.component';
import { ChamadaFormComponent } from '../chamada-form/chamada-form.component';

@Component({
  selector: 'app-chamada-list',
  standalone: true,
  imports: [
    MdbModalModule,
    AlunoFormComponent,
    MdbFormsModule,
    ChamadaFormComponent,
  ],
  templateUrl: './chamada-list.component.html',
  styleUrl: './chamada-list.component.scss',
})
export class ChamadaListComponent {
  lista: Aluno[] = [];
  alunoEdit!: Aluno;

  alunoService = inject(AlunoService);

  modalService = inject(MdbModalService);
  @ViewChild('modalAlunoForm') modalAlunoForm!: TemplateRef<any>;
  @ViewChild('modalChamadaForm') modalChamadaForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.alunoService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  new() {
    this.alunoEdit = new Aluno();
    this.modalRef = this.modalService.open(this.modalChamadaForm, {
      modalClass: 'modal-md',
    });
  }

  edit(aluno: Aluno) {
    this.alunoEdit = aluno;
    this.modalRef = this.modalService.open(this.modalAlunoForm, {
      modalClass: 'modal-md',
    });
  }

  myCustomEvent(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

  delete(id: number) {
    if (confirm('Deseja deletar isso aí?')) {
      this.alunoService.deleteById(id).subscribe({
        next: (listaRetornada) => {
          this.findAll();
        },
        error: (erro) => {},
      });
    }
  }
}
