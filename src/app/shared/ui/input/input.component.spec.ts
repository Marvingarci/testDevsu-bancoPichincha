import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputComponent]
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`value should be ''`, () => {
    expect(component.value).toBe('');
  });

  it(`valueChange should be an EventEmitter`, () => {
    expect(component.valueChange).toBeTruthy();
  });

  it(`onChange should emit valueChange`, () => {
    spyOn(component.valueChange, 'emit');
    const event: any = { target: { value: 'test' } };
    component.onChange(event as any);
    expect(component.valueChange.emit).toHaveBeenCalledWith('test');
  });

  

});
