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
import { ChamadaService } from '../../../../services/chamada/chamada.service';
import { Chamada } from '../../../../models/chamada/chamada';

@Component({
  selector: 'app-chamada-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, CommonModule],
  templateUrl: './chamada-form.component.html',
  styleUrl: './chamada-form.component.scss',
})
export class ChamadaFormComponent {
  selectedDate: string = '';

  @Input('chamada') chamada: Chamada = new Chamada();
  @Output('customEvent') event = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaList') modalTurmaList!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  chamadaService = inject(ChamadaService);

  save() {
    this.chamadaService.save(this.chamada).subscribe({
      next: (mensagem) => {
        Swal.fire(mensagem, '', 'success');
        this.roteador.navigate(['chamada/list']);
        this.event.emit('OK');
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      },
    });
  }
}
