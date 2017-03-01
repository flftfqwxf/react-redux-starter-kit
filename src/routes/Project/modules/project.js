import axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const LOAD_PROJECT = 'LOAD_PROJECT'
// ------------------------------------
// Actions
// ------------------------------------
export function increment(type, value = {}) {
    let actions = {
        type: type,
        project: value
    }
    return actions;
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
                dispatch(increment(LOAD_PROJECT, data.data))
            }
        })
    }
}
export const cleanProjectInfo = ()=> {
    return (dispatch)=> {
        dispatch(increment(undefined));
    }
}
export const saveProjectInfo = (projectInfo, callback)=> {
    return (dispatch)=> {
        let url = '/web/project/add'
        if (projectInfo.get('project_id')) {
            url = '/web/project/update'
        }
        axios.put(url, projectInfo).then((data)=> {
            if (data && data.data) {
                callback(data.data);
                // dispatch(increment(data.data))
            }
        })
    }
}
export const deleteProjectInfo = (projectId, callback)=> {
    return (dispatch)=> {
        let url = '/web/project/delete/' + projectId
        axios.delete(url, projectInfo).then((data)=> {
            if (data && data.data) {
                callback(data.data);
                // dispatch(increment(data.data))
            }
        })
    }
}
export const actions = {
    loadProjectInfo,
    saveProjectInfo,
    cleanProjectInfo,
    deleteProjectInfo
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_PROJECT]: (state, action) => null,
    [UPDATE_PROJECT]: (state, action) => action.project,
    [LOAD_PROJECT]: (state, action) => action.project
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {project_name: "", proxy_url: ''}
export default function addProjectReducer(state = initialState, action) {
    // console.log(action)
    // if (action.type === 'ADD_PROJECT') {
    //     state = ''
    // }
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
