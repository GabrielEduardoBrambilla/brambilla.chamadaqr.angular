import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Professor } from '../../../../models/professor/professor';
import { ProfessorService } from '../../../../services/professor/professor.service';
import { ProfessorFormComponent } from '../professor-form/professor-form.component';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [MdbModalModule, FormsModule, ProfessorFormComponent],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss',
})
export class ProfessorListComponent {
  lista: Professor[] = [];
  professorEdit!: Professor;
  searchTerm = '';

  professorService = inject(ProfessorService);
  modalService = inject(MdbModalService);

  @ViewChild('modalProfessorFormUNIQUE') modalProfessorForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.professorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  findSearched() {
    this.professorService.customSearch().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  new() {
    this.professorEdit = new Professor();
    this.modalRef = this.modalService.open(this.modalProfessorForm, {
      modalClass: 'modal-xl',
    });
  }

  edit(professor: Professor) {
    this.professorEdit = professor;
    this.modalRef = this.modalService.open(this.modalProfessorForm, {
      modalClass: 'modal-md',
    });
  }

  myCustomEvent(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

  delete(id: number) {
    if (confirm('Deseja deletar isso aí?')) {
      this.professorService.deleteById(id).subscribe({
        next: (listaRetornada) => {
          this.findAll();
        },
        error: (erro) => {},
      });
    }
  }
}
