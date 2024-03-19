import express, {json}  from 'express'
import { AnalizeImageRouter } from './routes/analizeimage.route.js'
import { AgricultorRouter } from './routes/agricultor.route.js'
import { TrabajadorRouter } from './routes/trabajador.route.js'
import { InvernaderoRouter } from './routes/invernadero.route.js'
import { TrabajadorInvernaderoRouter } from './routes/trabajadorinvernadero.route.js'
import { CamaRouter } from './routes/cama.route.js'
import { ImagenAnalizadaRouter } from './routes/imagenanalizada.route.js'
const app = express()
app.use(express.json())

app.disable('x-powered-by')

const port = 3000
app.use('/image',AnalizeImageRouter)
app.use('/agricultor',AgricultorRouter)
app.use('/trabajador',TrabajadorRouter)
app.use('/invernadero',InvernaderoRouter)
app.use('/cama',CamaRouter)
app.use('/imagenanalizada',ImagenAnalizadaRouter)
app.use('/trabajador/invernadero',TrabajadorInvernaderoRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))