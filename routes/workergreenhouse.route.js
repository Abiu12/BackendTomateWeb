import { Router } from "express";
import { WorkerGreenhouseController } from "../controllers/workergreenhouse.controller.js";

export const WorkerGreenhouseRouter = Router()

WorkerGreenhouseRouter.get('/',WorkerGreenhouseController.getAll)
WorkerGreenhouseRouter.get('/:id',WorkerGreenhouseController.getById)
WorkerGreenhouseRouter.post('/',WorkerGreenhouseController.create)
WorkerGreenhouseRouter.delete('/:id',WorkerGreenhouseController.delete)