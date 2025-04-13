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
import { Turma } from '../../../../models/turma/turma';
import { TurmaService } from '../../../../services/turma/turma.service';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss',
})
export class TurmaFormComponent {
  @Input('turma') turma: Turma = new Turma();
  @Output('customEvent') event = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaList') modalTurmaList!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alService = inject(TurmaService);

  constructor() {}

  save() {
    if (this.turma.id > 0) {
      // UPDATE
      this.alService.update(this.turma, this.turma.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/als']);
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
  selecionarTurma() {
    this.modalRef = this.modalService.open(this.modalTurmaList, {
      modalClass: 'modal-xl',
    });
  }
  myCustomEvent(mensagem: any) {
    this.modalRef.close();
  }
}
