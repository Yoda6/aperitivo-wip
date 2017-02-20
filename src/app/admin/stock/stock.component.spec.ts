/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockComponent } from './stock.component';
import { OrdersComponent } from '../orders/orders.component';
import { MaterialModule } from '@angular/material';
import { OrderService } from '../../shared/order-service/order.service';
import { AuthenticationService } from '../../shared/authentication-service/authentication.service';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

import { DataTableModule, DialogModule } from 'primeng/primeng';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataTableModule, DialogModule, AngularFireModule.initializeApp(firebaseConfig)],
      providers: [OrderService, AuthenticationService],
      declarations: [StockComponent, OrdersComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
