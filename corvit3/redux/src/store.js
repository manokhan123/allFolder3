import {applyMiddleware, createStore} from 'redux'
import allreducer from './reducer/allreducer'
import {thunk} from 'redux-thunk'
const store = createStore(allreducer , applyMiddleware(thunk) )

export default store