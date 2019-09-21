import { createStore } from "redux"
import { combineReducers } from "redux"
import { applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { LOCATION_CHANGE } from "connected-react-router"
import queryString from "query-string"

const initialState = {}


// REDUCER
// The only on, so it is here:
const reducer = (state = {}, { type, payload }) => {    
    switch (type) {
        case LOCATION_CHANGE:
            const { color, size } = queryString.parse(payload.location.search)

            return {
                ...state,
                color: color.split(','),
                size,
            }

        default:
            return state
    }
}


export const Middlewares = (thirdPartyMiddlewares = []) => composeWithDevTools({ trace: true, traceLimit: 25 })(
    applyMiddleware(
        ...thirdPartyMiddlewares,
        // our Middlewares should be here...
    )
)


export const Reducers = (thirdPartyReducers = {}) => combineReducers({
    form: reducer,
    ...thirdPartyReducers,
    // our Reducers should be here...
})


export default reducers => middlewares =>
    createStore(reducers, initialState, middlewares)