import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgListComponent } from './msg-list.component';

describe('MsgListComponent', () => {
  let component: MsgListComponent;
  let fixture: ComponentFixture<MsgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
