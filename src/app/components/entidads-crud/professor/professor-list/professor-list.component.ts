import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Aluno } from '../../../../models/aluno/aluno';
import { AlunoService } from '../../../../service/aluno/aluno.service';
import { ProfessorFormComponent } from '../professor-form/professor-form.component';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [MdbModalModule, FormsModule, ProfessorFormComponent],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss',
})
export class ProfessorListComponent {
  lista: Aluno[] = [];
  alunoEdit!: Aluno;

  alunoService = inject(AlunoService);

  modalService = inject(MdbModalService);
  @ViewChild('modalAlunoForm') modalAlunoForm!: TemplateRef<any>;
  @ViewChild('modalChamadaForm') modalChamadaForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  searchTerm = '';
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
