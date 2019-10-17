import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubDashboardComponent } from './pub-dashboard.component';

describe('PubDashboardComponent', () => {
  let component: PubDashboardComponent;
  let fixture: ComponentFixture<PubDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
