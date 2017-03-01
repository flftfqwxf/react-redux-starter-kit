import axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PROJECT_LIST = 'LOAD_PROJECT_LIST'
export const DELETE_PROJECT = 'DELETE_PROJECT'
// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = []) {
    return {
        type: LOAD_PROJECT_LIST,
        payload: value
    }
}
export function deleteAction(id = 0) {
    return {
        type: DELETE_PROJECT,
        id: id
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
export const deleteProjectInfo = (projectId, callback)=> {
    return (dispatch)=> {
        let url = '/web/project/delete/' + projectId
        axios.delete(url).then((data)=> {
            if (data && data.data) {
                callback(data.data);
                dispatch(deleteAction(projectId))
            }
        })
    }
}
export const actions = {
    increment,
    loadProjectList,
    deleteProjectInfo
}
// ------------------------------------
// Action Handlers action 处理
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAD_PROJECT_LIST]: (state, action) => {
        return action.payload
    },
    [DELETE_PROJECT]: (state, action) => {
        return state.slice().filter(item=>item.project_id !== action.id)
    },
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function homeReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
