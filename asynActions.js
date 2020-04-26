
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');
const initialState = {
    loading: true,
    users: [],
    error: ''
}
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};
const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};
const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                error: '',
                loading: false
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                users: [],
                loading: false
            }
        default:
            return state
    }
}
const fetchUser = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const users = res.data.map(user => user.id);
                dispatch(fetchUserSuccess(users));
            })
            .catch((err) => {
                dispatch(fetchUserFailure(err.messege));
            })
    }
}
const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
const sub = store.subscribe(()=>{
    console.log("@@@",store.getState());
})
store.dispatch(fetchUser());
