import { Router } from "express";
import { WorkerController } from "../controllers/worker.controller.js";

export const WorkerRouter = Router()

WorkerRouter.get('/',WorkerController.getAll)
WorkerRouter.get('/:id',WorkerController.getById)
WorkerRouter.post('/',WorkerController.create)
WorkerRouter.delete('/:id',WorkerController.delete)
WorkerRouter.get('/invernadero',WorkerController.getAll)
