const config = require('./config');
const skyWeb = require('./core/index');
const router = require('./router');
const nunjucks = require('nunjucks');
nunjucks.configure('./views', {
    autoescape: true
});
skyWeb.set('views', './views');
skyWeb.set('engine', 'nunjucks');
skyWeb.get('/test', function(req, res) {
    const str = nunjucks.render('test.nunj')
    res.write(str);
})
skyWeb.get('/aaa', function(req, res) {
    res.write('444');
})
skyWeb.listen(3655, function() {
    console.log('server is start');
})
// index(config, router);