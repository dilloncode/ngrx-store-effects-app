import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from "./pizzas.reducer";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

export const getProducstState = createFeatureSelector<ProductsState>('products');

// pizzas state
export const getPizzaState = createSelector(
  getProducstState,
  (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);