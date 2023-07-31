import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './toppings.selectors';

import { Topping } from 'src/products/models/topping.model';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingEntities', () => {
    it('should return the toppings as entities', () => {
      let result;

      store
        .select(fromSelectors.getToppingEntities)
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return the selected toppings as ids', () => {
      let result;

      store
        .select(fromSelectors.getSelectedToppings)
        .subscribe(value => {
          result = value;
        });

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.VisualizeToppings([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });
});
