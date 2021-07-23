import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import clubsReducer from './clubs';
import schoolReducer from './schools';
import session from './session'
import eventsReducer from './events';
import membershipReducer from './membership'
import rsvpReducer from './rsvp';


const rootReducer = combineReducers({
  session,
  clubs: clubsReducer,
  events: eventsReducer,
  memberships: membershipReducer,
  school: schoolReducer,
  rsvp: rsvpReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
