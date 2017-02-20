import { TestBed, async, inject } from '@angular/core/testing';
import { CartService } from './cart.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';


fdescribe('Service: Cart', () => {

  class AuthenticationServiceMock {
    public user = { uid: 'userUID', auth: { displayName: 'User display name' } };
  }

  const itemsMock = [
    { 'id': 0, '$key': '12324', '$exists': true, 'name': 'itemName', 'quantity': 2, 'type': 'itemType' },
    { 'id': 1, '$key': '644532', '$exists': true, 'name': 'itemName2', 'quantity': 1, 'type': 'itemType2' }
  ];

  const newAddItemMock = { 'id': 3, '$key': '123332434', '$exists': true, 'name': 'itemName 3', 'quantity': 1, 'type': 'itemType 3' };
  const existingAddItemMock = { 'id': 0, '$key': '12324', '$exists': true, 'name': 'itemName', 'quantity': 2, 'type': 'itemType' };

  class FirebaseListObservableMock<T> extends FirebaseListObservable<T> {
    push(val: any): any { return null; };
    remove(item?: any): any { return null; };
  }

  class AngularFireDatabaseMock {
    object(path: String): FirebaseObjectObservable<any> {
      return new FirebaseObjectObservable(subscriber => {
        subscriber.next();
        subscriber.complete();
      });
    }

    list(path: String): FirebaseListObservableMock<any[]> {
      return new FirebaseListObservableMock(null, observer => {
        observer.next(itemsMock);
        observer.complete();
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock }
      ]
    });
  });

  it('should exists', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));

  it('constructor, should load the current cart', inject([CartService], (service: CartService) => {
    expect(service.items).toBeDefined();
    expect(service.localItems).toBe(itemsMock);
  }));

  it('getItems, should return an observable of cart items', inject([CartService], (service: CartService) => {
    const result = service.getItems();
    expect(result).toBeDefined();
    result.subscribe(cartItems => {
      expect(cartItems).toBe(itemsMock);
    });
  }));

  it('addItem, should add an item to the cart if it was not present', inject([CartService], (service: CartService) => {
    spyOn(FirebaseListObservableMock.prototype, 'push');
    const result = service.addItem(newAddItemMock);
    expect(FirebaseListObservableMock.prototype.push).toHaveBeenCalledTimes(1);
    expect(FirebaseListObservableMock.prototype.push).toHaveBeenCalledWith({
      'id': 3,
      'name': 'itemName 3',
      'quantity': 1,
      'type': 'itemType 3',
      'userName': 'User display name'
    });
  }));

  it('addItem, should update an item to the cart if it was present', inject([CartService], (service: CartService) => {
    spyOn(FirebaseListObservableMock.prototype, 'push');
    spyOn(FirebaseListObservableMock.prototype, 'remove');
    const result = service.addItem(existingAddItemMock);
    expect(FirebaseListObservableMock.prototype.push).toHaveBeenCalledTimes(1);
    expect(FirebaseListObservableMock.prototype.remove).toHaveBeenCalledTimes(1);
    expect(FirebaseListObservableMock.prototype.push).toHaveBeenCalledWith({
      'id': 0,
      'name': 'itemName',
      'quantity': 3,
      'type': 'itemType',
      'userName': 'User display name'
    });
  }));
});
