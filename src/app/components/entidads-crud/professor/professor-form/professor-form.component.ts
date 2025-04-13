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
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Professor } from '../../../../models/professor/professor';
import { ProfessorService } from '../../../../services/professor/professor.service';
import { TurmaListComponent } from '../../turma/turma-list/turma-list.component';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, CommonModule, TurmaListComponent],
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss'],
})
export class ProfessorFormComponent {
  @Input() professor: Professor = new Professor();
  @Output('customEvent') event = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  professorService = inject(ProfessorService);
  modalService = inject(MdbModalService);

  @ViewChild('modalTurmaSelect') modalTurmaSelect!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  save() {
    if (this.professor.id) {
      this.professorService
        .update(this.professor, this.professor.id)
        .subscribe({
          next: () => {
            Swal.fire('Professor atualizado com sucesso!');
            this.event.emit('OK');
          },
          error: (err) => {
            Swal.fire('Erro ao atualizar professor.');
            console.error(err);
            this.event.emit('OK');
          },
        });
    } else {
      this.professorService.save(this.professor).subscribe({
        next: () => {
          Swal.fire('Professor registrado com sucesso!');
          this.professor = new Professor(); // Reset form
          this.event.emit('OK');
        },
        error: (err) => {
          Swal.fire('Erro ao registrar professor.');
          console.error(err);
          this.event.emit('OK');
        },
      });
    }
  }

  selecionarTurma() {
    this.modalRef = this.modalService.open(this.modalTurmaSelect, {
      modalClass: 'modal-xl',
    });
  }
}
