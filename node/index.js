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
skyWeb.put('/web/project/add', function(req, res) {
    // res.writeHead(200, {"Content-Type": types['json']});
    let body = JSON.parse(req.body);
    let sql = 'select count(project_id) as count from mock_project where project_name="' + body.project_name + '"';
    debug(sql)
    let conn;
    pool.getConnection().then(
        (connection)=> {
            conn = connection;
            return conn.query(sql)
        }
    ).then((rows)=> {
        if (rows[0].count > 0) {
            res.write(JSON.stringify({
                code: 401,
                msg: '项目名称已存在，请修改'
            }));
            res.end();
        } else {
            let insertSql = 'insert into mock_project (project_name,proxy_url) values("' + body.project_name + '","' + body.proxy_url + '")'
            return conn.query(insertSql).then((data)=> {
                if (data.affectedRows > 0) {
                    res.write(JSON.stringify({
                        code: 200,
                        msg: '添加成功'
                    }));
                    res.end();
                }
            });
        }
    }).catch((err)=> {
        debug(err.message)
        res.write(err.message);
        res.end();
    })
    // use post['blah'], etc.
    // const project_id = req.body.project_id;
})
skyWeb.delete('/web/project/delete/:id', (req, res)=> {
    pool.query('delete from mock_project where project_id=' + req.params.id).then(
        (data)=> {
            if (data.affectedRows > 0) {
                res.write(JSON.stringify({
                    code: 200,
                    msg: '删除成功'
                }));
                res.end();
            }
        }
    ).catch((err)=> {
        res.write(err.message);
        res.end();
    })
})
// index(config, router);