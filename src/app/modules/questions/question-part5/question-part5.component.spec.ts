import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPart5Component } from './question-part5.component';

describe('QuestionPart5Component', () => {
  let component: QuestionPart5Component;
  let fixture: ComponentFixture<QuestionPart5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPart5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPart5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
