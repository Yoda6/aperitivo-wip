/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrinkService } from './drink.service';

describe('Service: Drink', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrinkService]
    });
  });

  it('should ...', inject([DrinkService], (service: DrinkService) => {
    expect(service).toBeTruthy();
  }));
});
