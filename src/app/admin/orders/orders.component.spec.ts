/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrdersComponent } from './orders.component';
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

import { DataTableModule } from 'primeng/primeng';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataTableModule, AngularFireModule.initializeApp(firebaseConfig)],
      providers: [OrderService, AuthenticationService],
      declarations: [OrdersComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
