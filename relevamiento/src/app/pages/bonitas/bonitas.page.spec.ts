import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BonitasPage } from './bonitas.page';

describe('BonitasPage', () => {
  let component: BonitasPage;
  let fixture: ComponentFixture<BonitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BonitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
