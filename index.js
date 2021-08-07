const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const sql = require('mysql')
const mailer = require('./mailer')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use((req, res ,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', '*')
      return res.status(200).json({})
    }
  })



const pool = sql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    port:3306,
    host: process.env.HOST || 'remotemysql.com',
    user: process.env.USER_NAME || 'sNm1ketuyD',
    password: process.env.PASSWORD || 'oy3qnPSEHh',
    database: process.env.DB || 'sNm1ketuyD', 
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    console.log(req.body)
    pool.getConnection((err, con) => {
        if(err){
            res.status(500).json({
                message: "An Error Occoured",
                error: err.message
            })
        }else{
            con.query(`INSERT INTO leads SET name = "${req.body.name}", email = "${req.body.email}"`, (err, result) => {
                if(err){
                    res.status(500).json({
                        message: "An Error Occoured",
                        error: err.message
                    })
                }else{
                   res.redirect('hhtps://twinkleandblink.com/ebook.pdf')
                }
            })
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})