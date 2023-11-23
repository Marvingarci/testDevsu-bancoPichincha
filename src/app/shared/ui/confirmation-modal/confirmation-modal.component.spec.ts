import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { AppModule } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { CLOSE_OVERLAY_TOKEN } from 'src/app/products/ui/product-table/product-table.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent, HttpClientModule, AppModule, ],
      providers:[
        {
          provide: CLOSE_OVERLAY_TOKEN,
          useValue: {}
        }
      ]
    });
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
