import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaListComponent } from './presenca-list.component';

describe('PresencaListComponent', () => {
  let component: PresencaListComponent;
  let fixture: ComponentFixture<PresencaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresencaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresencaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
