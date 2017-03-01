// Sync route definition
import {injectReducer} from '../../store/reducers'
export const addProject = (store)=>({
    path: '/project/add',
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const AddProject = require('./containers/AddProjectContainer').default
            const reducer = require('./modules/project').default
            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, {key: 'project', reducer})
            /*  Return getComponent   */
            cb(null, AddProject)
            /* Webpack named bundle   */
        }, 'home')
    },
    onLeave(){
        store.dispatch({type: 'ADD_PROJECT'})
    }
})
export const editProject = (store)=>({
    path: '/project/edit/:project_id',
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const AddProject = require('./containers/AddProjectContainer').default
            const reducer = require('./modules/project').default
            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, {key: 'project', reducer})
            /*  Return getComponent   */
            cb(null, AddProject)
            /* Webpack named bundle   */
        }, 'home')
    },
    onLeave(){
        store.dispatch({type: 'ADD_PROJECT'})
    }
})