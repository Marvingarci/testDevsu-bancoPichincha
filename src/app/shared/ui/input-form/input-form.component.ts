import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFormComponent,
      multi: true,
    },
  ],
})
export class InputFormComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() fc: any | null = {};
  value: any = '';
  
  onChange : (value: any) => void = () => {};

  ngOnInit(): void {
    console.log(this.fc.errors);
  }

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('touched');
  }

  setValue(value: Event) {
    const target = value.target as HTMLInputElement;
    //validate if label is date_release, should be a date from now and then, not the past
    if(this.label == 'Fecha de Liberacion'){
      const date = new Date(target.value);
      const now = new Date();
      if(date < now){
        this.fc.setErrors({pastDate: true});
        this.fc.markAsDirty();
        return;
      }
    } 
    this.value = target.value.trim();
    this.onChange(this.value);
  }

  getArry(arry: any) {
    return Object.entries(arry);
  }

  errors = {
    required: 'Este campo es requerido',
    minlength: 'El valor es muy corto',
    maxlength: 'El valor es muy largo'
  }
}
