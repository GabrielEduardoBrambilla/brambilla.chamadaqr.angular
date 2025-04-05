import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadaFormComponent } from './chamada-form.component';

describe('ChamadaFormComponent', () => {
  let component: ChamadaFormComponent;
  let fixture: ComponentFixture<ChamadaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
