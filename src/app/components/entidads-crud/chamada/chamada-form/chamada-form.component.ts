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
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Chamada } from '../../../../models/chamada/chamada';
import { ChamadaService } from '../../../../services/chamada/chamada.service';

@Component({
  selector: 'app-chamada-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, CommonModule],
  templateUrl: './chamada-form.component.html',
  styleUrl: './chamada-form.component.scss',
})
export class ChamadaFormComponent {
  @Input('chamada') chamada: Chamada = new Chamada();
  @Output('customEvent') event = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaList') modalTurmaList!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alService = inject(ChamadaService);
  selectedDate: string = '';

  constructor() {}

  save() {
    if (this.chamada && this.chamada.id > 0) {
      // UPDATE
      this.alService.update(this.chamada, this.chamada.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          // this.roteador.navigate(['admin/als']);
          this.event.emit('OK');
        },
        error: (erro) => {
          console.log(erro);
          Swal.fire(erro.error, '', 'error');
          // this.roteador.navigate(['app/chamada/list']);
          this.event.emit('OK');
        },
      });
    } else {
      // SAVE
      this.alService.save(this.chamada).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          // this.roteador.navigate(['app/chamada/list']);
          this.event.emit('OK');
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
          // this.roteador.navigate(['app/chamada/list']);
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
