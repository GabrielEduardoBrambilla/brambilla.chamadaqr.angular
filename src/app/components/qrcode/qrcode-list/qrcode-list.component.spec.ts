import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeListComponent } from './qrcode-list.component';

describe('QrcodeListComponent', () => {
  let component: QrcodeListComponent;
  let fixture: ComponentFixture<QrcodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
