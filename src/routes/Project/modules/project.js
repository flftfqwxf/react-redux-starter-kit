import axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_PROJECT = 'ADD_PROJECT'
// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = {}) {
    return {
        type: ADD_PROJECT,
        project: value
    }
}
/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */
export const loadProjectInfo = (projectId)=> {
    return (dispatch)=> {
        axios.get('/web/project/info/' + projectId).then((data)=> {
            if (data) {
                dispatch(increment(data.data))
            }
        })
    }
}
export const saveProjectInfo = (projectInfo)=> {
    return (dispatch)=> {
        let url = '/web/project/add'
        if (projectInfo.project_id) {
            url = '/web/project/update'
        }
        axios.post(url, projectInfo).then(()=> {
            if (data) {
                // dispatch(increment(data.data))
            }
        })
    }
}
export const actions = {
    loadProjectInfo,
    saveProjectInfo
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_PROJECT]: (state, action) => action.project
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {project_name: "ab33c", proxy_url: 'ddd'}
export default function addProjectReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
