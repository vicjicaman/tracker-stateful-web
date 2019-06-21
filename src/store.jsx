import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';

export default({reducers, initialState}) => {

  const history = createHistory();
  const sagaMiddleware = createSagaMiddleware();

  //console.log(preloadedState);
  // Allow the passed state to be garbage-collected
  //delete window.__PRELOADED_STATE__;
  const store = createStore(
  /***/
  combineReducers({routing: routerReducer, app: reducers}), initialState,
  /**/
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    /**/
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined')
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f));

  store.runSaga = sagaMiddleware.run;
  return {store, history};
};
