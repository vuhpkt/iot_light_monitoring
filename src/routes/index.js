import siteRouter from './site.js'
import apiRouter from './api.js'

function route(app) {
    app.use('/api', apiRouter)
    app.use('/', siteRouter)

}
export default route
