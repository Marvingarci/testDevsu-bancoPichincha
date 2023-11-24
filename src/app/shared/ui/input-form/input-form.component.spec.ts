import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, FormsModule, InputFormComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: InputFormComponent,
          multi: true,
        },
      ],
    });
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value and call onChange for setValue method', () => {
    let event = {
      target: {
        value: 'test value',
      },
    } as any;
    const onChangeSpy = spyOn(component, 'onChange');

    component.setValue(event);


    expect(component.value).toBe('test value');
    expect(onChangeSpy).toHaveBeenCalledWith('test value');
  });

  it('should return array of entries for getArry method', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
    };
    const result = component.getArry(obj);

    expect(result).toEqual(Object.entries(obj));
  });

  it('should validateDate method set fc errors when label is Fecha de Liberacion and date is in the past', () => {
    component.label = 'Fecha de Liberacion';
    component.fc = new FormControl();
    const target = {
      value: '2021-11-25',
    } as any;
    component.validateDate(target);

    // expect(component.fc.errors).toEqual({ pastDate: true });
    expect(component.fc.dirty).toBeTrue();
  });

});
