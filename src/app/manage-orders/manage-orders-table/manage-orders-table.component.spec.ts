import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersTableComponent } from './manage-orders-table.component';

describe('ManageOrdersTableComponent', () => {
  let component: ManageOrdersTableComponent;
  let fixture: ComponentFixture<ManageOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
