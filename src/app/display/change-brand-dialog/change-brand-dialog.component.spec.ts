import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBrandDialogComponent } from './change-brand-dialog.component';

describe('ChangeBrandDialogComponent', () => {
  let component: ChangeBrandDialogComponent;
  let fixture: ComponentFixture<ChangeBrandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBrandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
