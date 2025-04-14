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
import { Aluno } from '../../../../models/aluno/aluno';
import { AlunoService } from '../../../../services/aluno/aluno.service';
import { AlunoFormComponent } from '../aluno-form/aluno-form.component';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [
    FormsModule,
    MdbModalModule,
    CommonModule,
    AlunoFormComponent,
    MdbCheckboxModule,
  ],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss',
})
export class AlunoListComponent {
  lista: Aluno[] = [];
  alunoEdit!: Aluno;

  searchTerm = '';

  alunoService = inject(AlunoService);
  modalService = inject(MdbModalService);

  @Input('currentSelectedAlunos') currentSelectedAlunos: Aluno[] = [];
  @Input('isTurmaSelect') isTurmaSelect: boolean = false;
  @ViewChild('modalAlunoForm') modalAlunoForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  @Output() confirm = new EventEmitter<Aluno[]>();

  constructor() {
    // this.selectedAlunos = this.currentSelectedAlunos;
    this.findAll();
  }

  confirmSelectAlunos() {
    this.confirm.emit(this.currentSelectedAlunos);
  }
  toggleAlunoTurma(event: Event, aluno: Aluno) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectAlunoTurma(aluno);
    } else {
      this.deselectAlunoTurma(aluno);
    }
    console.log(this.currentSelectedAlunos);
  }
  selectAlunoTurma(aluno: Aluno) {
    const alreadySelected = this.currentSelectedAlunos.some(
      (a) => a.id === aluno.id
    );
    if (!alreadySelected) {
      this.currentSelectedAlunos.push(aluno);
    }
  }
  deselectAlunoTurma(aluno: Aluno) {
    this.currentSelectedAlunos = this.currentSelectedAlunos.filter(
      (a) => a.id !== aluno.id
    );
  }

  isAlunoSelected(aluno: Aluno): boolean {
    const isSelected = this.currentSelectedAlunos.some(
      (selected) => selected.id === aluno.id
    );
    // isSelected ? this.selectAlunoTurma(aluno) : false;
    return isSelected;
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
