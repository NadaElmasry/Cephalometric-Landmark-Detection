import express from 'express'
import cors from 'cors'
import connectDB from './DB/connjection.js'
import  userRouter from './routes/user.route.js'

const app = express()
const port = process.env.PORT||3000

app.use(express.json())
app.use(cors())


app.use("/user", userRouter)


app.use('*', (req, res) => res.send('In-valid Routing'))
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



   