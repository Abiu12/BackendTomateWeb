import express  from 'express'
import { AnalizeImageRouter } from './routes/analizeimage.route.js'
import { FarmerRouter } from './routes/farmer.route.js'
import { WorkerRouter } from './routes/worker.route.js'
import { GreenhouseRouter } from './routes/greenhouse.route.js'
import { BedRouter } from './routes/bed.route.js'
import { AnalizedImageRouter } from './routes/analizedimage.route.js'
import { DiseaseRouter } from './routes/disease.route.js'
import { PlagueRouter } from './routes/plague.route.js'
const app = express()
app.use(express.json())

app.disable('x-powered-by')

const port = 3000
app.use('/image',AnalizeImageRouter)
app.use('/farmer',FarmerRouter)
app.use('/worker',WorkerRouter)
app.use('/greenhouse',GreenhouseRouter)
app.use('/bed',BedRouter)
app.use('/analizedImage',AnalizedImageRouter)
app.use('/disease',DiseaseRouter)
app.use('/plague',PlagueRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))