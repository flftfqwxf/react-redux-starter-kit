import axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PROJECT_LIST = 'LOAD_PROJECT_LIST'
// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = []) {
    return {
        type: LOAD_PROJECT_LIST,
        payload: value
    }
}
/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */
export const loadProjectList = ()=> {
    return (dispatch, getState)=> {
        axios.get('/web/project_list').then((data)=> {
            if (data) {
                dispatch(increment(data.data))
            }
        })
    }
}
export const actions = {
    increment,
    loadProjectList
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAD_PROJECT_LIST]: (state, action) => action.payload
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function homeReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
