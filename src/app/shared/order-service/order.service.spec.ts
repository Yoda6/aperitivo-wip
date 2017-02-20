import { TestBed, async, inject } from '@angular/core/testing';
import { OrderService } from './order.service';
import { DrinkService } from '../drink-service/drink.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

describe('Service: Order', () => {

  const userOrder = {
    $key: '123456789',
    orderUserUID: {
      items: [
        { 'id': '0', 'name': 'itemName', 'quantity': '2', 'type': 'itemType', 'userName': 'user name' },
        { 'id': '3', 'name': 'itemName2', 'quantity': '5', 'type': 'itemType', 'userName': 'user name' }
      ]
    }
  };

  const secondOrder = {
    'order-userUID2': {
      'items': {
        '1':
        { 'id': '3', 'name': 'itemName2', 'quantity': '7', 'type': 'itemType2', 'userName': 'user name 2' }
      }
    }
  };

  const items = [
    { 'id': 0, '$key': '12324', '$exists': true, 'name': 'itemName', 'quantity': 2, 'type': 'itemType' },
    { 'id': 1, '$key': '644532', '$exists': true, 'name': 'itemName2', 'quantity': 1, 'type': 'itemType2' }
  ];

  class AuthenticationServiceMock {
    public user = { uid: 'userUID', auth: { displayName: 'User display name' } };
  }

  class DrinkServiceMock {
    reduceStock(item) {
    }
  }

  class FirebaseObjectObservableMock<T> extends FirebaseObjectObservable<T> {
    remove(): any { return new Promise(null); };
    set(): any { };
  }

 class AngularFireDatabaseMock {
    object(path: String): FirebaseObjectObservableMock<any> {
      return new FirebaseObjectObservableMock(subscriber => {
        subscriber.next(userOrder);
        subscriber.complete();
      });
    }

    list(path: String): FirebaseListObservable<any[]> {
      return FirebaseListObservable.create(observer => {
        observer.next([userOrder, secondOrder]);
        observer.complete();
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService,
        { provide: DrinkService, useClass: DrinkServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock }]
    });
  });

  it('should exists', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));

  it('constructor, should load the current user order on init', inject([OrderService], (service: OrderService) => {
    expect(service.orderObs).toBeDefined();
    expect(service.order).toBe(userOrder);
  }));

  it('getOrders, should load all the orders', inject([OrderService], (service: OrderService) => {
    const result = service.getOrders();
    result.subscribe(orders => {
      expect(orders.length).toBe(2);
      expect(orders[0]).toBe(userOrder);
      expect(orders[1]).toBe(secondOrder);
    });
  }));

  it('getOrder, should load the current user\'s order', inject([OrderService], (service: OrderService) => {
    const result = service.getOrder();
    result.subscribe(order => {
      expect(order).toBeDefined();
      expect(order).toBe(userOrder);
    });
  }));

  it('cleanItems, should clean the items and set the order when there is no old order', inject([OrderService], (service: OrderService) => {
    spyOn(FirebaseObjectObservableMock.prototype, 'set').and.callThrough();
    spyOn(FirebaseObjectObservableMock.prototype, 'remove').and.callThrough();
    const mockExists = () => { return false; };
    service.order = { $exists: mockExists };
    service.addOrder(items);
    expect(items[0].$key).toBeUndefined();
    expect(items[0].$exists).toBeUndefined();
    expect(items[1].$key).toBeUndefined();
    expect(items[1].$exists).toBeUndefined();
    expect(FirebaseObjectObservableMock.prototype.set).toHaveBeenCalledTimes(1);
    expect(FirebaseObjectObservableMock.prototype.remove).toHaveBeenCalledTimes(0);
  }));

  it('cleanItems, should clean the items and merge and replace the old order', inject([OrderService], (service: OrderService) => {
    spyOn(FirebaseObjectObservableMock.prototype, 'set').and.callThrough();
    spyOn(FirebaseObjectObservableMock.prototype, 'remove').and.callThrough();
    const mockExists = () => { return true; };
    service.order = { $exists: mockExists, items: [{ 'id': 0, 'quantity': 1 }] };
    service.addOrder(items);
    expect(items[0].$key).toBeUndefined();
    expect(items[0].$exists).toBeUndefined();
    expect(items[0].quantity).toBe(3);
    expect(items[1].$key).toBeUndefined();
    expect(items[1].$exists).toBeUndefined();
    expect(items[1].quantity).toBe(1);
    expect(FirebaseObjectObservableMock.prototype.set).toHaveBeenCalledTimes(1);
    expect(FirebaseObjectObservableMock.prototype.remove).toHaveBeenCalledTimes(1);
  }));

  it('validateOrder, should reduce the stock and delete the order',
    inject([OrderService, DrinkService], (service: OrderService, drinkService: DrinkService) => {
      spyOn(drinkService, 'reduceStock');
      spyOn(service, 'deleteOrder');
      service.validateOrder(userOrder.orderUserUID);
      expect(drinkService.reduceStock).toHaveBeenCalledTimes(userOrder.orderUserUID.items.length);
      expect(service.deleteOrder).toHaveBeenCalledTimes(1);
    }));

  it('deleteOrder, should delete the order from database', inject([OrderService], (service: OrderService) => {
    spyOn(FirebaseObjectObservableMock.prototype, 'remove').and.callThrough();
    service.deleteOrder(userOrder);
    expect(FirebaseObjectObservableMock.prototype.remove).toHaveBeenCalledTimes(1);
  }));
});
