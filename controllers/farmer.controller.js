import { FarmerModel } from "../models/farmer.model.js"
import { PersonModel } from "../models/person.model.js"
import { UserModel } from "../models/user.model.js"
import { WorkerModel } from "../models/worker.model.js"
export class FarmerController {
    static async getAll(req, res) {
        const farmers = await FarmerModel.getAll()
        // var resultFarmers = []
        // for(const farmer of farmers){
        //     const idPerson = farmer.id_persona
        //     const person = await PersonModel.getById({idPerson})
        //     const user = await UserModel.getByIdPerson({idPerson})
        //     const resultFarmer = {
        //         idFarmer: farmer.id_agricultor,
        //         idPerson: farmer.id_persona,
        //         name: person.nombre,
        //         surname: person.primer_apellido,
        //         secondName: person.segundo_apellido,
        //         phone: person.telefono,
        //         email: person.correo_electronico,
        //         nameUser: user.nombre_usuario,
        //         password: user.contrasenia
        //     }
        //     resultFarmers.push(resultFarmer)
        // }
        res.json(farmers)
    }
    static async getById(req, res) {
        const { id } = req.params
        const idPerson = await FarmerModel.getById({ id })
        const farmer = await PersonModel.getById({ id: idPerson.id_persona })
        if (farmer) return res.json(farmer)
        return res.status(404).json({ message: "Agricultor no encontrado" })
    }
    static async create(req, res) {
        const {
            name,
            surname,
            secondSurname,
            phone,
            email,
            nameUser,
            password,
            role } = req.body
        const idPerson = await PersonModel.create({ input: { name, surname, secondSurname, phone, email } })
        await FarmerModel.create({ idPerson })
        await UserModel.create({ input: { nameUser, password, idPerson, role } })
        res.status(201).json({ message: 'Agricultor creado' })
    }
    static async delete(req, res) {
        const { idFarmer } = req.params
        const farmer = await FarmerModel.getById({ idFarmer })
        await PersonModel.delete({ idPerson: farmer.id_persona })
        res.json({ message: "El agricultor ha sido eliminado" })
    }
    static async getWorkersByIdFarmer(req, res) {
        const { idFarmer } = req.params
        const workerByFarmer = await WorkerModel.getWorkersByIdFarmer({ idFarmer })
        // var resultWorkerGreenhouses = []
        // for(const workerGreenhouse of workerGreenhouses ){
        //     var idPerson = workerGreenhouse.id_persona
        //     //Obtener los datos de la persona
        //     var person = await PersonModel.getById({idPerson})
        //     //Obtener los datos de los usuarios
        //     var user = await UserModel.getByIdPerson({idPerson})
        //     const resultWorkerGreenhouse = {
        //         idWork: workerGreenhouse.id_trabajador,
        //         idPerson:person.id_persona,
        //         idFarmer: parseInt(idFarmer),
        //         name: person.nombre,
        //         surname: person.primer_apellido,
        //         secondSurname: person.segundo_apellido,
        //         phone: person.telefono,
        //         email: person.correo_electronico,
        //         nameUser: user.nombre_usuario,
        //         password: user.contrasenia
        //     }
        //     resultWorkerGreenhouses.push(resultWorkerGreenhouse)
        // }
        res.json(workerByFarmer)
    }
    static async update(req, res) {
        const { idFarmer } = req.params
        const {
            name,
            surname,
            secondSurname,
            phone,
            email,
            nameUser,
            password,
            role
        } = req.body
        //Necesito el id de la persona
        const farmer = await FarmerModel.getById({ idFarmer })
        const idPerson = farmer.id_persona
        await PersonModel.update({ input: { idPerson, name, surname, secondSurname, phone, email } })
        await UserModel.update({ input: { idPerson, nameUser, password } })
        res.json({ message: "Se han actualizado los datos del agricultor" })
    }
    static async changePassword(req, res) {
        const {
            idFarmer
        } = req.params
        const {
            oldPassword,
            newPassword
        } = req.body
        //Tengo que tener al usuario que quiero comparar la contraseña
        const farmer = await FarmerModel.getById({ idFarmer })
        const user = await UserModel.getByIdPerson({ idPerson: farmer.id_persona })
        if (user) {
            if (user.contrasenia === oldPassword) {
                await UserModel.changePassword({ input: { newPassword, idPerson: farmer.id_persona } })
                return res.json({ message: "La contraseña se ha cambiado" })
            }
            else {
                return res.json({ message: "La contraseña es incorrecta" })
            }
        }
    }
    static async getNotifications(req, res) {
        const { idFarmer } = req.params
        const notifications = await FarmerModel.getNotifications({idFarmer})
        res.json(notifications)
    }
}