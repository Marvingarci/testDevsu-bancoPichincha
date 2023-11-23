import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponent } from './product-table.component';
import { AppModule } from 'src/app/app.module';
import { ProductShellModule } from '../../feature/product-shell/product-shell.module';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      imports: [AppModule, ProductShellModule]
    });
    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
