import express  from 'express'
import cors from 'cors'
import multer from 'multer'
import { AnalizeImageRouter } from './routes/analizeimage.route.js'
import { FarmerRouter } from './routes/farmer.route.js'
import { WorkerRouter } from './routes/worker.route.js'
import { GreenhouseRouter } from './routes/greenhouse.route.js'
import { BedRouter } from './routes/bed.route.js'
import { AnalizedImageRouter } from './routes/analizedimage.route.js'
import { DiseaseRouter } from './routes/disease.route.js'
import { PlagueRouter } from './routes/plague.route.js'
import { ReportRouter } from './routes/report.route.js'
const app = express()
app.use(cors());
app.use(express.json())
// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' }); // Directorio donde se almacenarán los archivos subidos

app.disable('x-powered-by')

const port = 3000

app.use('/farmer',FarmerRouter)
app.use('/worker',WorkerRouter)
app.use('/greenhouse',GreenhouseRouter)
app.use('/bed',BedRouter)
app.use('/analizedImage',AnalizedImageRouter)
app.use('/disease',DiseaseRouter)
app.use('/plague',PlagueRouter)
app.use('/analyzeimage',upload.single('image'),AnalizeImageRouter)
app.use('/report',ReportRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))