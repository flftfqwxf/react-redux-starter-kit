// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import {addProject, editProject} from './Project/index'
import Home2 from './Home2'
import CounterRoute from './Counter'
/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home(store),
    childRoutes: [
        CounterRoute(store),
        {
            path: 'home2',
            /*  Async getComponent is only invoked when route matches   */
            getComponent (nextState, cb) {
                /*  Webpack - use 'require.ensure' to create a split point
                 and embed an async module loader (jsonp) when bundling   */
                require.ensure([], (require) => {
                    /*  Webpack - use require callback to define
                     dependencies for bundling   */
                    const Counter = require('./Home2/components/HomeView').default
                    /*  Return getComponent   */
                    cb(null, Counter)
                    /* Webpack named bundle   */
                }, 'counter')
            }
        },
        addProject(store),
        editProject(store)
    ]
})
/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */
export default createRoutes
