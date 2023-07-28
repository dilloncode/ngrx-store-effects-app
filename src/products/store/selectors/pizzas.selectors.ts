import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProducstState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzaEntities
);

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllPizzas = createSelector(
  getPizzaEntities,
  (entities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);