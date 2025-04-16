import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { Chamada } from '../../../../models/chamada/chamada';

@Component({
  selector: 'app-qrcode-list',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qrcode-list.component.html',
  styleUrl: './qrcode-list.component.scss',
})
export class QrcodeListComponent {
  @Input('chamada') currentSelectedChamadas!: Chamada;

  qrValue = '';

  constructor(private route: ActivatedRoute) {
    const chamadaId = this.route.snapshot.paramMap.get('id');

    if (chamadaId) {
      this.qrValue = `http://localhost:8080/presenca/${chamadaId}`;
    }
  }
}
