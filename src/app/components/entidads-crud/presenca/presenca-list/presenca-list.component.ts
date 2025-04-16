import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { Chamada } from '../../../../models/chamada/chamada';

@Component({
  selector: 'app-presenca-list',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './presenca-list.component.html',
  styleUrl: './presenca-list.component.scss',
})
export class PresencaListComponent {
  @Input('chamada') currentSelectedChamadas!: Chamada;

  qrValue = '';

  constructor(private route: ActivatedRoute) {
    const chamadaId = this.route.snapshot.paramMap.get('id');

    if (chamadaId) {
      this.qrValue = `http://localhost:8080/presenca/${chamadaId}`;
    }
  }
}
