import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Aluno } from '../../../../models/aluno/aluno';
import { Professor } from '../../../../models/professor/professor';
import { Turma } from '../../../../models/turma/turma';
import { ProfessorService } from '../../../../services/professor/professor.service';
import { TurmaService } from '../../../../services/turma/turma.service';
import { AlunoListComponent } from '../../aluno/aluno-list/aluno-list.component';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [
    forwardRef(() => FormsModule),
    forwardRef(() => MdbModalModule),
    forwardRef(() => AlunoListComponent),
  ],
  // imports: [FormsModule, MdbModalModule, AlunoListComponent],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss',
})
export class TurmaFormComponent {
  @Input('turma') turma: Turma = new Turma();
  @Output('customEvent') event = new EventEmitter();
  lista: Professor[] = [];

  @ViewChild('modalTurmaList') modalTurmaList!: TemplateRef<any>;
  @ViewChild('modalProfessor') modalProfessorSelect!: TemplateRef<any>;
  @ViewChild('modalAlunosSelect') modalAlunosSelect!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  modalService = inject(MdbModalService);
  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alService = inject(TurmaService);
  professorService = inject(ProfessorService);

  constructor() {}

  save() {
    if (this.turma.id > 0) {
      // UPDATE
      this.alService.update(this.turma, this.turma.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.event.emit('OK');
        },
        error: (erro) => {
          console.log(erro);
          Swal.fire(erro.error, '', 'error');
          this.roteador.navigate(['app/turma/list']);
          this.event.emit('OK');
        },
      });
    } else {
      // SAVE
      this.alService.save(this.turma).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['app/turma/list']);
          this.event.emit('OK');
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
          this.roteador.navigate(['app/turma/list']);
          this.event.emit('OK');
        },
      });
    }
  }

  handleAlunosConfirm(alunos: Aluno[]) {
    this.turma.alunos = alunos;
    console.log('Alunos selecionados:', alunos);
    this.modalRef.close();
  }

  openAlunosmodal() {
    this.modalRef = this.modalService.open(this.modalAlunosSelect, {
      modalClass: 'modal-xl',
    });
    this.findAllProfessores();
  }

  openProfessormodal() {
    this.modalRef = this.modalService.open(this.modalProfessorSelect, {
      modalClass: 'modal-xl',
    });
    this.findAllProfessores();
  }
  selecionarProfessor(professor: Professor): void {
    this.turma.professorResponsavel = professor;
    this.modalRef.close();
    console.log(this.turma);
  }
  findAllProfessores() {
    this.professorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
    console.log(this.lista);
  }
  myCustomEvent(mensagem: any) {
    this.modalRef.close();
  }
}
