
const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const combineReducers = redux.combineReducers;
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

let getCake = () => {
    return {
        type: BUY_CAKE,
        info: 'first redux app'
    }
}
let getIceCreame = () => {
    return {
        type: BUY_ICE_CREAM,
        info: 'get ice cream'
    }
}
const initialState = {
    noCakes: 10
}
const cakeReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                noCakes: state.noCakes - 1
            }

        default:
            return state;
    }
}
const initialStateIce = {
    noIceCreams: 10
}
const iceReducer = (state = initialStateIce, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                noCakes: state.noIceCreams - 1
            }

        default:
            return state;
    }
}
const masterReducer = combineReducers({
    cake: cakeReducer,
    ice: iceReducer
});
const store = createStore(masterReducer, applyMiddleware(logger));
// console.log("initial state", store.getState());
let unsubscribe = store.subscribe(() => {
});
store.dispatch(getCake());
store.dispatch(getCake());
unsubscribe();
// store.dispatch(getCake());