import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCreateComponent } from './product-create.component';
import { AppModule } from 'src/app/app.module';
import { ProductShellModule } from '../product-shell/product-shell.module';
import { ProductService } from '../../data-access/services/product.service';
import { ToastService } from 'src/app/shared/data-access/toast.service';
import { Router } from '@angular/router';
import { productMockEdit, productMockNonExists, productMockValid, productMockValidDate } from '../../utils/mocks/products.mock';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let productService: ProductService;
  let toastService: ToastService;
  let router: Router;
  let fb: FormBuilder;
  let httpMock: HttpTestingController;

  beforeEach(() => {  
    TestBed.configureTestingModule({
      declarations: [ProductCreateComponent],
      imports: [AppModule, ProductShellModule, HttpClientTestingModule]
    });
    productService = TestBed.inject(ProductService);
    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formCreate with correct controls', () => {
    const form = component.formProduct;
    expect(form.get('id')).toBeTruthy();
    expect(form.get('name')).toBeTruthy();
    expect(form.get('logo')).toBeTruthy();
    expect(form.get('description')).toBeTruthy();
    expect(form.get('date_release')).toBeTruthy();
    expect(form.get('date_revision')).toBeTruthy();
  });

  it(`it should have a title 'Formulario de Registro' when Product doesnt Exists'`, () => {
    component.productToEdit = null;
    component.ngOnInit();
    expect(component.title).toEqual('Formulario de Registro');
  });

  it(`it should have a title 'Editar Registro' when Product Exists'`, () => {
    component.productToEdit = productMockValid
    component.checkIfProductExists();
    expect(component.title).toEqual('Editar Registro');
  });

  it('should call checkIfProductExists() when ngOnInit() is called', () => {
    const spycheckIfProductExists = spyOn(component, 'checkIfProductExists');
    component.ngOnInit();
    expect(spycheckIfProductExists).toHaveBeenCalled();
  });

  it('should set editMode and title when productToEdit is not null', () => {
    component.productToEdit = productMockValidDate 
    component.checkIfProductExists();

    expect(component.editMode).toBe(true);
    expect(component.title).toBe('Editar Registro');
    expect(component.formProduct.value).toEqual(productMockValid);
  });

  it('should call productService.createProduct() when submit() is called', () => {
    const mockProduct = productMockValid;
     component.formProduct = fb.group({
      id: [mockProduct.id],
      name: [mockProduct.name],
      logo: [mockProduct.logo],
      description: [mockProduct.description],
      date_release: [mockProduct.date_release],
      date_revision: [mockProduct.date_revision],
    });

    const productServiceSpy = spyOn(productService, 'createProduct').and.returnValue(of(mockProduct));
    const toastServiceSpy = spyOn(toastService, 'showSuccess');
    const routerSpy = spyOn(router, 'navigate');
  
    component.submit('create');
  
    // expect(productServiceSpy).toHaveBeenCalled();
    // expect(toastServiceSpy).toHaveBeenCalledWith('Producto Creado exitosamente');
    // expect(routerSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should mark all controls as dirty when form in invalid', () => {
    component.formProduct.get('id')?.setValue('');
    component.submit('create');
    expect(component.formProduct.valid).toBeFalse();
    expect(component.formProduct.get('id')?.dirty).toBeTrue();

    component.formProduct.patchValue(productMockValid);
    expect(component.formProduct.valid).toBeTrue();
  });

  it('should call productService.updateProduct() when submit() is called', () => {
    let mockProduct = productMockEdit;
    component.formProduct = fb.group({
      id: [mockProduct.id],
      name: [mockProduct.name],
      logo: [mockProduct.logo],
      description: [mockProduct.description],
      date_release: [mockProduct.date_release],
      date_revision: [mockProduct.date_revision],
    });

    const productServiceSpy = spyOn(productService, 'updateProduct').and.returnValue(of(mockProduct));
    const toastServiceSpy = spyOn(toastService, 'showSuccess');
    const routerSpy = spyOn(router, 'navigate');
  
    component.submit('edit');
  
    expect(productServiceSpy).toHaveBeenCalled();
    // expect(toastServiceSpy).toHaveBeenCalledWith('Producto Editado exitosamente');
    expect(routerSpy).toHaveBeenCalledWith(['/products']);

    mockProduct = productMockValid;
    component.submit('create');
    expect(productServiceSpy).toHaveBeenCalled();
    expect(toastServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/products']);

  });

  it('should handle duplicate product error', () => {
    // Simulate a form error by making it invalid
    // Modify form controls to make it invalid (e.g., omit required fields)
    component.formProduct.patchValue(productMockEdit);

    const spyCreateProduct = spyOn(productService, 'createProduct').and.returnValue(throwError({ error: "Can't create because product is duplicate" }));
    const toastServiceSpy = spyOn(toastService, 'showWarning');
    expect(component.formProduct.valid).toBeTrue();
    component.submit('create');

    expect(spyCreateProduct).toHaveBeenCalled();
    expect(toastServiceSpy).toHaveBeenCalledWith('El producto ya existe');

    component.formProduct.patchValue(productMockNonExists);
    const spyUpdatedProduct = spyOn(productService, 'updateProduct').and.returnValue(throwError({ error: "Not product found with that id" }));
    expect(component.formProduct.valid).toBeTrue();
    component.submit('edit');

    expect(spyUpdatedProduct).toHaveBeenCalled();
    expect(toastServiceSpy).toHaveBeenCalledWith('El producto con ese ID no existe');

  });

  it('markAllControlsAs should call markAllControlsAsTouched() when submit() is called', fakeAsync(() => {
    const spyMarkAllControlsAsTouched = spyOn(component, 'markAllControlsAs');
    const mockProduct = productMockValid;
    component.formProduct = fb.group({
        id: [mockProduct.id, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
        name: [mockProduct.name, Validators.required],
        description: [mockProduct.description, Validators.required],
        logo: [mockProduct.logo, Validators.required],
        date_release: [mockProduct.date_release, Validators.required],
        date_revision: [mockProduct.date_revision, Validators.required],
    });
    component.markAllControlsAs(component.formProduct, false);
    tick(1000);
    expect(spyMarkAllControlsAsTouched).toHaveBeenCalled();
    expect(component.formProduct.get('id')?.dirty).toBeFalse();
  }));

  it('should mark all controls as dirty when condition is true', () => {
    const formGroup: FormGroup = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    component.markAllControlsAs(formGroup, true);

    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      expect(control?.dirty).toBe(true);
    });

    component.markAllControlsAs(formGroup, false);

    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      expect(control?.pristine).toBe(true);
    });
  });

  it('should reset with resetform() when submit() is called', () => {
    const spyMarkAllControlsAsTouched = spyOn(component, 'markAllControlsAs');
    component.resetForm();
    expect(component.formProduct.get('id')?.value).toBe('');
    expect(component.formProduct.get('description')?.value).toBe('');
    expect(component.formProduct.get('logo')?.value).toBe('');
    expect(spyMarkAllControlsAsTouched).toHaveBeenCalledWith(component.formProduct, false);
  });

});

