import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibidosComponent } from './recibidos.component';

describe('RecibidosComponent', () => {
  let component: RecibidosComponent;
  let fixture: ComponentFixture<RecibidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecibidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
