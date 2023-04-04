import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/error.js'
import students from './routes/student.js'
import teachers from './routes/teacher.js'



const app = express()
const port = 8000
const DATABASE_URL = "mongodb://admin:silvertouch@192.168.0.163:27017/?authMechanism=DEFAULT"; // karan
// const DATABASE_URL = "mongodb+srv://luckypatel:sttl123@cluster0.z6pvres.mongodb.net/?retryWrites=true&w=majority"; // Luky

// const DATABASE_URL = "mongodb://localhost:27017"


app.use(cors("*"))
app.use(express.json())
connectDB(DATABASE_URL)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));






app.get('/api/', (req, res) => {
    res.send('Hello World')
})


app.use('/api/student', students)
app.use('/api/teacher', teachers)

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server is listening at http://127.0.0.1:${port}`)
})
