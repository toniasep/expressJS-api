const express = require('express');
const bodyarser = require('body-parser');
const koneksi = require('./config/database');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}))

//post data activity
app.post('/activity-groups', (req, res) => {
    const data = { ...req.body };
    console.log(data);
    const querySql = 'INSERT INTO activity SET ?';

    koneksi.query(querySql, data, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Insert Data!!',
                    error : err
                }
            );
        }

        res.status(200).json(
            {
                success : true,
                message : 'Success Insert Data!!'
            }
        )
    });  
});

//get all activity
app.get('/activity-groups', (req, res) => {
    const email = req.query.email;
    let querySql = 'SELECT id, title, created_at FROM activity';
    if (email) {
        querySql += ' WHERE email = "' + email + '"';
    }
    let limit = parseInt(req.query.limit || 1000);
    querySql += ' limit ' + limit;
    koneksi.query(querySql, email, (err, rows, field) => {
        
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Get Data!!',
                    error : err
                }
            );
        }

        res.status(200).json(
            {
                total : rows.length,
                limit : limit,
                skip : 0,
                data : rows
            }
        )
    });  
});

//get one activity
app.get('/activity-groups/:id', (req, res) => {
    const id = req.params.id;

    console.log(id);
    let querySql = 'SELECT id, title, created_at FROM activity WHERE id = '+id+'; SELECT id, title, activity_group_id, is_active, priority FROM todo WHERE activity_group_id = '+id+';';


    koneksi.query(querySql, (err, rows, field) => {
        
        // console.log(rows);
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Get Data!!',
                    error : err
                }
            );
        }
        // console.log(rows);
        if(rows.length === 0){
            return res.status(404).json(
                {
                    name : "NotFound",
                    message : "No record found for id "+id,
                    code : 404,
                    className : "not-found",
                    errors : {}
                }
            )
        }
        res.status(200).json(
            {
                id : rows[0][0].id,
                title : rows[0][0].title,
                created_at : rows[0][0].created_at,
                todo_items : rows[1]
            }
        )
    });  
});

//update data activity
app.patch('/activity-groups/:id', (req, res) => {
    const id = req.params.id;
    const data = { ...req.body };
    console.log(data);
    const querySql = 'UPDATE activity SET ? WHERE id='+id+'; SELECT * FROM activity WHERE id='+id;

    koneksi.query(querySql, data, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Update Data!!',
                    error : err
                }
            );
        }
        
        res.status(200).json(
            // {
                rows[1][0]
            // }
        )
    });  
});


//delete data activity
app.delete('/activity-groups/:id', (req, res) => {
    const id = req.params.id;
    const querySql = 'DELETE FROM activity WHERE id='+id;

    koneksi.query(querySql, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Delete Data!!',
                    error : err
                }
            );
        }
        res.status(200).json(
            {
                message: 'Successfully deleted data'
            }
        )
    });  
});






//post data todo
app.post('/todo-items', (req, res) => {
    const data = { ...req.body };
    console.log(data);
    const querySql = 'INSERT INTO todo SET ?';

    koneksi.query(querySql, data, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Insert Data!!',
                    error : err
                }
            );
        }

        res.status(200).json(
            {
                success : true,
                message : 'Success Insert Data!!'
            }
        )
    });  
});

//get all todo
app.get('/todo-items', (req, res) => {
    const activity_group_id = req.query.activity_group_id;
    let querySql = 'SELECT id, title, activity_group_id, is_active, priority FROM todo';
    if (activity_group_id) {
        querySql += ' WHERE activity_group_id = "' + activity_group_id + '"';
    }
    let limit = parseInt(req.query.limit || 1000);
    querySql += ' limit ' + limit;
    koneksi.query(querySql, (err, rows, field) => {
        
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Get Data!!',
                    error : err
                }
            );
        }

        res.status(200).json(
            {
                total : rows.length,
                limit : limit,
                skip : 0,
                data : rows
            }
        )
    });  
});


//get one todo
app.get('/todo-items/:id', (req, res) => {
    const id = req.params.id;

    console.log(id);
    let querySql = 'SELECT id, title, is_active, priority FROM todo WHERE id = '+id;

    koneksi.query(querySql, (err, rows, field) => {
        
        // console.log(rows);
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Get Data!!',
                    error : err
                }
            );
        }
        // console.log(rows);
        if(rows.length === 0){
            return res.status(404).json(
                {
                    name : "NotFound",
                    message : "No record found for id "+id,
                    code : 404,
                    className : "not-found",
                    errors : {}
                }
            )
        }
        res.status(200).json(
            {
                id : rows[0].id,
                title : rows[0].title,
                is_active : rows[0].is_active,
                priority : rows[0].priority
            }
        )
    });  
});


//update data todo
app.patch('/todo-items/:id', (req, res) => {
    const id = req.params.id;
    const data = { ...req.body };
    const querySql = 'UPDATE todo SET ? WHERE id='+id+'; SELECT * FROM todo WHERE id='+id;

    koneksi.query(querySql, data, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Update Data!!',
                    error : err
                }
            );
        }
        
        res.status(200).json(
            // {
                rows[1][0]
            // }
        )
    });  
});


//delete data todo
app.delete('/todo-items/:id', (req, res) => {
    const id = req.params.id;
    const querySql = 'DELETE FROM todo WHERE id='+id;

    koneksi.query(querySql, (err, rows, field) => {
        if(err){
            return res.status(500).json(
                {
                    message: 'Failed Delete Data!!',
                    error : err
                }
            );
        }
        res.status(200).json(
            {
                message: 'Successfully deleted data'
            }
        )
    });  
});


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
