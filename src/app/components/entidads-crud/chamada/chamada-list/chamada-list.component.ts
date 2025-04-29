import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
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
import { firstValueFrom } from 'rxjs';
import { Chamada } from '../../../../models/chamada/chamada';
import { Professor } from '../../../../models/professor/professor';
import { Turma } from '../../../../models/turma/turma';
import { ChamadaService } from '../../../../services/chamada/chamada.service';
import { ProfessorService } from '../../../../services/professor/professor.service';
import { ChamadaFormComponent } from '../../chamada/chamada-form/chamada-form.component';
import { PresencaListComponent } from '../../presenca/presenca-list/presenca-list.component';
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
    PresencaListComponent,
  ],
  templateUrl: './chamada-list.component.html',
  styleUrl: './chamada-list.component.scss',
})
export class ChamadaListComponent {
  lista!: Chamada[];
  listaProfessores!: Professor[];
  chamadaEdit!: Chamada;

  searchTerm = '';

  chamadaService = inject(ChamadaService);
  modalService = inject(MdbModalService);

  @Input('currentSelectedChamadas') currentSelectedChamadas: Chamada[] = [];
  @Input('isTurmaSelect') isTurmaSelect: boolean = false;
  @ViewChild('modalChamadaForm') modalChamadaForm!: TemplateRef<any>;
  @ViewChild('modalTurmaSelectChamadaForm')
  modalTurmaSelectChamadaForm!: TemplateRef<any>;
  @ViewChild('modalProfessor') modalProfessor!: TemplateRef<any>;
  @ViewChild('modalChamadaDetails') modalChamadaDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  @Output() confirm = new EventEmitter<Chamada[]>();
  cdr = inject(ChangeDetectorRef); // injeção direta
  professorService = inject(ProfessorService);

  selectedChamadaDetails!: Chamada;
  selectedProfessor!: Professor;
  selectedTurma!: Turma;

  constructor() {}

  openQRcode(al: Chamada) {
    console.log(al);
    const id = al.id;

    const url = `http://localhost:4200/professor/chamada/${id}`;
    window.open(url, '_blank');
  }
  findSearched() {
    this.chamadaService.customSearch().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  openChamada(al: Chamada) {
    this.selectedChamadaDetails = al;
    this.modalRef = this.modalService.open(this.modalChamadaDetails, {
      modalClass: 'modal-xl',
    });
  }
  openSelectProfessorModal() {
    this.chamadaEdit = new Chamada();
    this.modalRef = this.modalService.open(this.modalProfessor, {
      modalClass: 'modal-md',
    });
    this.findAllProfessores();
  }
  selecionarProfessor(professor: Professor): void {
    this.selectedProfessor = professor;
    this.chamadaEdit.professor = professor;

    this.modalRef.close();
  }
  findAllProfessores() {
    this.professorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.listaProfessores = listaRetornada;
      },
      error: (erro) => {},
    });
    console.log(this.lista);
  }
  selectTurma() {
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

  async onTurmaSelected(turma: Turma) {
    this.selectedTurma = turma;

    this.modalRef.close();
    try {
      const listaRetornada = await firstValueFrom(
        this.chamadaService.findByTurmaId(turma.id)
      );

      this.lista = [...listaRetornada];
      this.cdr.detectChanges();
      this.chamadaEdit.turma = turma;

      console.log('Turma selecionada:', this.lista);
    } catch (erro) {
      console.error('Erro ao buscar chamadas:', erro);
    }
    // this.findByTurmaId(turma);
    // console.log('Turma selecionada:', this.lista);
  }

  findByTurmaId(turma: Turma) {
    this.chamadaService.findByTurmaId(turma.id).subscribe({
      next: (listaRetornada) => {
        // console.log('Lista chamada:', listaRetornada);
        // console.log('Before assignment:', this.lista);
        this.lista = [...listaRetornada];
        // console.log('After assignment:', this.lista);
      },
      error: (erro) => {
        console.error('Erro ao buscar chamadas:', erro);
      },
    });
  }
}
