// Sync route definition
import {injectReducer} from '../../store/reducers'
export default (store)=>({
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Counter = require('./components/HomeView').default
            const reducer = require('./modules/home').default
            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, {key: 'project', reducer})
            /*  Return getComponent   */
            cb(null, Counter)
            /* Webpack named bundle   */
        }, 'counter')
    }
})
