import { spawn } from 'child_process';

export class AnalizeImageController {
    static async detected(req, res) {
        const { image } = req.params;
        const holaMundo = await AnalizeImageController.holaMundo();
        res.json(holaMundo)
    }

    static holaMundo() {
        return new Promise((resolve, reject) => {
            let datos = ''
            // Comando para ejecutar el script de Python
            const pythonProcess = spawn('python', ['yolo.py']);
            // Capturar la salida del proceso
            pythonProcess.stdout.on('data', (data) => {
                datos += data.toString(); // Recopilar los datos en una variable
            });
            // Capturar los errores del proceso
            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            // Manejar el cierre del proceso
            pythonProcess.on('close', (code) => {
                console.log(`Proceso de Python finalizado con código ${code}`);
                try {
                    const regex = /{([^}]*)}/;
                    const match = datos.match(regex); // Buscar coincidencia en el texto
                    const resultados = JSON.parse(match[0]) ; // Analizar los datos como JSON
                    resolve(resultados);
                } catch (error) {
                    reject(error);
                }
            });
        })
    }

}

