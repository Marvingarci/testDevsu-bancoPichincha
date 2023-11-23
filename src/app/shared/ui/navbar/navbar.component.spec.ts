import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente NavBar deberia crearse', () => {
    expect(component).toBeTruthy();
  });

  it('El componente nav deberia tener un Logo del Banco', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.img-logo');
    expect(imgElement).toBeTruthy(); 
    expect(imgElement.src).toBeTruthy();

    const image = new Image();
    image.src = imgElement.src;
    image.onerror = () => {
      fail('El logo no esta renderizando correctamente'); 
    };
    image.onload = () => {
      expect(image.complete).toBeTrue(); 
    };
  });
});
