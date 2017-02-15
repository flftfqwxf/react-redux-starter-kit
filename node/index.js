const config = require('./config');
const skyWeb = require('./core/index');
const nunjucks = require('nunjucks');
const types = require('./core/mimetype').types;
var mysql = require('promise-mysql');
let pool = mysql.createPool(config.mysql);
const qs = require('qs');
var debug = require('debug')('sql');
nunjucks.configure('./views', {
    autoescape: true
});
skyWeb.set('views', './views');
skyWeb.set('engine', 'nunjucks');
skyWeb.get('/test', function(req, res) {
    const str = nunjucks.render('test.nunj')
    res.write(str);
    res.end();
})
skyWeb.post('/aaa', function(req, res) {
    const str = nunjucks.render('test.nunj')
    res.write(str);
    res.end();
})
skyWeb.get('/web/project/info/:id', function(req, res) {
    // res.writeHead(200, {"Content-Type": types['json']});
    pool.query('select * from mock_project where project_id=' + req.params.id).then(
        (data)=> {
            const json = JSON.stringify(data[0]);
            res.write(json);
            res.end();
        }
    ).catch((err)=> {
        res.write(err.message);
        res.end();
    })
})
skyWeb.get('/web/project_list', function(req, res) {
    // res.writeHead(200, {"Content-Type": types['json']});
    pool.query('select * from mock_project').then(
        (data)=> {
            const json = JSON.stringify(data);
            res.write(json);
            res.end();
        }
    ).catch((err)=> {
        res.write(err.message);
        res.end();
    })
})
skyWeb.listen(3655, function() {
    console.log('server is start');
})
skyWeb.put('/web/project/update', function(req, res) {
    // res.writeHead(200, {"Content-Type": types['json']});
    let body = JSON.parse(req.body);
    let sql = 'update mock_project set project_name="' + body.project_name + '",proxy_url="' + body.proxy_url + '"   where project_id=' + body.project_id;
    debug(sql)
    pool.query(sql).then(
        (data)=> {
            if (data.affectedRows > 0) {
                res.write(JSON.stringify({
                    code: 200,
                    msg: '修改成功'
                }));
            }
            res.end();
        }
    ).catch((err)=> {
        debug(err.message)
        res.write(err.message);
        res.end();
    })
    // use post['blah'], etc.
    // const project_id = req.body.project_id;
})
// index(config, router);