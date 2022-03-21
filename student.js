const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('public', path.join(__dirname, 'public'))
let student = [
    {
    "id": "12345",
    "fullname": "Eren Yeager",
    "motto": "If You Don't Fight, You Can't Win"
    },

    {
        "id": "28122",
        "fullname": "Mark Cabael",
        "motto": "Time is Gold"
    }
]


app.get('/', (req,res)=>{
    res.redirect('/')
})


//GET ALL RECORDS
app.get('/student', (req,res)=>{
    res.status(200).json({
        status: 200,
        count: student.length,
        student
        })
})

//GET ID
app.get('/student/:id', (req,res)=>{

    const{id} = req.params
    const item = student.find(obj =>{
        return obj.id === id
    })
    res.status(200).json({
        status: 200,
        collection: item
    })

})

//CREATE
app.post('/student', (req,res)=>{
    const {id,fullname,motto} = req.body
    student.push({id,fullname,motto})
    res.status(201).redirect('/')
})

//DELETE
app.delete('/students/:id', (req,res)=>{

    const{id} = req.params
    const index = student.findIndex(obj =>{
        return obj.id === id
    })
    if(index > -1){
        student.splice(index,1)
        res.status(200).redirect('/')       
    }else{
        res.status(404).json({
            status: 404,
            message: "Resource not found."
        })
    }

})

//UPDATE

app.post('/students/:id', (req,res)=>{
    const {id} = req.params
    const {fullname, motto} = req.body

    const index = student.findIndex(obj =>{
        return obj.id === id
    })


    student[index].fullname = fullname
    student[index].motto = motto 
  

    if(index > -1){
        res.status(200).redirect('/')  
    }else{
        res.status(404).json({
            status: 404,
            id,
            message: 'Resource not found.'
        })
    }

})


app.listen(port,()=>{
console.log(`You are connected to port ${port}`)
})
