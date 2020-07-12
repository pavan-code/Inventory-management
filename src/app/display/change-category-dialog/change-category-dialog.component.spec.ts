import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCategoryDialogComponent } from './change-category-dialog.component';

describe('ChangeCategoryDialogComponent', () => {
  let component: ChangeCategoryDialogComponent;
  let fixture: ComponentFixture<ChangeCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
