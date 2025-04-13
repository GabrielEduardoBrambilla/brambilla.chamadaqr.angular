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
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Aluno } from '../../../../models/aluno/aluno';
import { AlunoService } from '../../../../services/aluno/aluno.service';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss',
})
export class AlunoFormComponent {
  @Input('aluno') aluno: Aluno = new Aluno();
  @Output('customEvent') event = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaList') modalTurmaList!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alService = inject(AlunoService);

  constructor() {}

  save() {
    if (this.aluno.id > 0) {
      // UPDATE
      this.alService.update(this.aluno, this.aluno.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/als']);
          this.event.emit('OK');
        },
        error: (erro) => {
          console.log(erro);
          Swal.fire(erro.error, '', 'error');
          this.roteador.navigate(['app/aluno/list']);
          this.event.emit('OK');
        },
      });
    } else {
      // SAVE
      this.alService.save(this.aluno).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['app/aluno/list']);
          this.event.emit('OK');
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
          this.roteador.navigate(['app/aluno/list']);
          this.event.emit('OK');
        },
      });
    }
  }
  selecionarTurma() {
    this.modalRef = this.modalService.open(this.modalTurmaList, {
      modalClass: 'modal-xl',
    });
  }
  myCustomEvent(mensagem: any) {
    this.modalRef.close();
  }
}
