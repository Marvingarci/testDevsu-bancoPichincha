import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateComponent } from './product-create.component';
import { AppModule } from 'src/app/app.module';
import { ProductShellModule } from '../product-shell/product-shell.module';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  beforeEach(() => {  
    TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
      imports: [AppModule, ProductShellModule]
    });
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
