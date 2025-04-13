import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Aluno } from '../../../../models/aluno/aluno';
import { AlunoService } from '../../../../services/aluno/aluno.service';
import { AlunoFormComponent } from '../aluno-form/aluno-form.component';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, AlunoFormComponent],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss',
})
export class AlunoListComponent {
  lista: Aluno[] = [];
  alunoEdit!: Aluno;
  alunoService = inject(AlunoService);
  searchTerm = '';

  modalService = inject(MdbModalService);
  @ViewChild('modalAlunoForm') modalAlunoForm!: TemplateRef<any>; //referência ao template da modal
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
    this.modalRef = this.modalService.open(this.modalAlunoForm, {
      modalClass: 'modal-xl',
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
