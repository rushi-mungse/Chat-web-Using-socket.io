const express=require('express')
const app=express()
const http=require('http').createServer(app)

const PORT=process.env.PORT || 5500;

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

http.listen(PORT,()=>{console.log(`Server listening on port ${PORT}`)})

const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})  
