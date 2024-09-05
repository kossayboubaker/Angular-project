import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpeComponent } from './helpe.component';

describe('HelpeComponent', () => {
  let component: HelpeComponent;
  let fixture: ComponentFixture<HelpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
