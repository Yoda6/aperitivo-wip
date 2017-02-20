import { TestBed, async, inject } from '@angular/core/testing';
import { DrinkService } from '../drink-service/drink.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

describe('Service: Drink', () => {

  class AuthenticationServiceMock {
    public user = { uid: 'userUID', auth: { displayName: 'User display name' } };
  }

  class FirebaseObjectObservableMock<T> extends FirebaseObjectObservable<T> {
    update(value: Object): firebase.Promise<void> { return new Promise(null); };
  }

  const drinksMock = [
    { id: 0, name: 'drink1', stock: 2 },
    { id: 1, name: 'drink2', stock: 4 },
    { id: 3, name: 'drink2', stock: 0 }
  ];

  const updateDrink = {
    $exists: true,
    $key: '13038732',
    id: 0,
    name: 'drink1',
    quantity: 1
  };

  class AngularFireDatabaseMock {
    object(path: String): FirebaseObjectObservableMock<any> {
      return new FirebaseObjectObservableMock(subscriber => {
        subscriber.next(drinksMock[1]);
        subscriber.complete();
      });
    }

    list(path: String): FirebaseListObservable<any[]> {
      return FirebaseListObservable.create(observer => {
        observer.next(drinksMock);
        observer.complete();
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrinkService,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock }]
    });
  });

  it('should exists', inject([DrinkService], (service: DrinkService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch the list of drinks', inject([DrinkService], (service: DrinkService) => {
    const result = service.fetch();
    result.subscribe(drinks => {
      expect(drinks).toEqual(drinksMock);
    });
  }));

  it('should fetch a drink by it\'s id', inject([DrinkService], (service: DrinkService) => {
    const result = service.fetchOne(1);
    result.subscribe(drink => {
      expect(drink.id).toEqual(1);
      expect(drink.name).toEqual('drink2');
      expect(drink.stock).toEqual(4);
    });
  }));

  it('update, should clean the drink of $exists and $key', inject([DrinkService], (service: DrinkService) => {
    service.update(updateDrink);
    expect(updateDrink.$exists).toBeUndefined();
    expect(updateDrink.$key).toBeUndefined();
  }));

  it('update, should update the given drink', inject([DrinkService], (service: DrinkService) => {
    spyOn(FirebaseObjectObservableMock.prototype, 'update');
    service.update(updateDrink);
    expect(FirebaseObjectObservableMock.prototype.update).toHaveBeenCalledTimes(1);
  }));

  it('reduceStock, should remove the order quantity from the drink\'s stock', inject([DrinkService], (service: DrinkService) => {
    spyOn(service, 'update');
    service.reduceStock(updateDrink);
    expect(service.update).toHaveBeenCalledTimes(1);
    const drink = { id: 1, name: 'drink2', stock: 3 };
    expect(service.update).toHaveBeenCalledWith(drink);
  }));

  it('reduceStock, should remove the order quantity from the drink\'s stock but never go negative',
    inject([DrinkService], (service: DrinkService) => {
      spyOn(service, 'update');
      updateDrink.quantity = 5;
      service.reduceStock(updateDrink);
      expect(service.update).toHaveBeenCalledTimes(1);
      const drink = { id: 1, name: 'drink2', stock: 0 };
      expect(service.update).toHaveBeenCalledWith(drink);
    })
  );

  it('create, should create a new drink', inject([DrinkService], (service: DrinkService) => {
    expect(false).toBeTruthy();
  }));
});
