import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainComponent } from './product-main.component';
import { ProductShellModule } from '../product-shell/product-shell.module';
import { AppModule } from 'src/app/app.module';

describe('ProductMainComponent', () => {
  let component: ProductMainComponent;
  let fixture: ComponentFixture<ProductMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductMainComponent],
      imports: [AppModule, ProductShellModule]
    });
    fixture = TestBed.createComponent(ProductMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
