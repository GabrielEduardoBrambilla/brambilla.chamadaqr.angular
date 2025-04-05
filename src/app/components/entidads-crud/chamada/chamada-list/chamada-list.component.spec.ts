import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadaListComponent } from './chamada-list.component';

describe('ChamadaListComponent', () => {
  let component: ChamadaListComponent;
  let fixture: ComponentFixture<ChamadaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
