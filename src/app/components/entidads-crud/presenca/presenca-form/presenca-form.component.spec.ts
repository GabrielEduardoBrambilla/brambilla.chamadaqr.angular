import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaFormComponent } from './presenca-form.component';

describe('PresencaFormComponent', () => {
  let component: PresencaFormComponent;
  let fixture: ComponentFixture<PresencaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresencaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresencaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
