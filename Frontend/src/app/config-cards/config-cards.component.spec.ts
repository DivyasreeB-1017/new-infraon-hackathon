import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCardsComponent } from './config-cards.component';

describe('ConfigCardsComponent', () => {
  let component: ConfigCardsComponent;
  let fixture: ComponentFixture<ConfigCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
