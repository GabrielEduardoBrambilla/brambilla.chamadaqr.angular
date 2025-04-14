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
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Turma } from '../../../../models/turma/turma';
import { TurmaService } from '../../../../services/turma/turma.service';
import { TurmaFormComponent } from '../turma-form/turma-form.component';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, CommonModule, TurmaFormComponent],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss',
})
export class TurmaListComponent {
  lista: Turma[] = [];
  turmaEdit!: Turma;
  turmaService = inject(TurmaService);
  searchTerm = '';

  modalService = inject(MdbModalService);
  @ViewChild('modalTurmaForm') modalTurmaForm!: TemplateRef<any>; //referência ao template da modal
  modalRef!: MdbModalRef<any>;
  @Input('isTurmaSelect') isTurmaSelect: boolean = false;
  @Output() turmaSelected = new EventEmitter<Turma>();

  constructor() {
    this.findAll();
  }

  findAll() {
    this.turmaService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {},
    });
  }
  new() {
    this.turmaEdit = new Turma();
    this.modalRef = this.modalService.open(this.modalTurmaForm, {
      modalClass: 'modal-xl',
    });
  }

  edit(turma: Turma) {
    this.turmaEdit = turma;
    this.modalRef = this.modalService.open(this.modalTurmaForm, {
      modalClass: 'modal-md',
    });
  }

  myCustomEvent(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }
  selectTurmaChamada(turma: Turma) {
    this.turmaSelected.emit(turma);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.turmaService.deleteById(id).subscribe({
          next: () => {
            this.findAll();
            Swal.fire(
              'Deletado!',
              'A turma foi removida com sucesso.',
              'success'
            );
          },
          error: (erro) => {
            Swal.fire('Erro!', 'Houve um problema ao deletar.', 'error');
          },
        });
      }
    });
  }
}
