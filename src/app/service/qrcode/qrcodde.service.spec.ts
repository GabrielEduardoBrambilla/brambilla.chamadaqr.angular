import { TestBed } from '@angular/core/testing';

import { QrcoddeService } from './qrcodde.service';

describe('QrcoddeService', () => {
  let service: QrcoddeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcoddeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
