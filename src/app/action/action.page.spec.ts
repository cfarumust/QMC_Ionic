import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActionPage } from './action.page';

describe('ActionPage', () => {
  let component: ActionPage;
  let fixture: ComponentFixture<ActionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
