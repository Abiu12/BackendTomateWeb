import express, {json}  from 'express'
import { AnalizeImageRouter } from './routes/analizeimage.route.js'
import { AgricultorRouter } from './routes/agricultor.route.js'
import { TrabajadorRouter } from './routes/trabajador.route.js'
const app = express()
app.use(express.json())

app.disable('x-powered-by')

const port = 3000
app.use('/image',AnalizeImageRouter)
app.use('/agricultor',AgricultorRouter)
app.use('/trabajador',TrabajadorRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))