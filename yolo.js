// const child_process = require("child_process");
// const script = `${__dirname}\\yolo.py`;
// const yolo = image => {
//   const inputFilePath = `${__dirname}\\original_images\\${image}`;
//   const outputFilePath = `${__dirname}\\runs\\${image}`;
  
//   return new Promise((resolve, reject) => {
//     const yoloProcess = child_process.spawn(
//       "python3",
//       [script, inputFilePath, outputFilePath],
//       {
//         detached: true,
//         stdio: "pipe"
//       }
//     );
//     yoloProcess.stderr.on("data", data => console.log(data.toString()));
//     yoloProcess.on("close", code => {
//       if (code === 0) resolve(outputFilePath);
//       else reject();
//     });
//   });
// };

// module.exports = yolo;

const child_process = require("child_process");
const script = `${__dirname}\\yolo.py`;
const yolo = image => {
  const inputFilePath = `${__dirname}\\original_images\\${image}`;
  const outputFilePath = `${__dirname}\\runs\\${image}`;
  
  return new Promise((resolve, reject) => {
    const yoloProcess = child_process.spawn(
      "python3",
      [script, inputFilePath, outputFilePath],
      {
        detached: true,
        stdio: "pipe"
      }
    );
    debugger
    let namesJSON = '';
    yoloProcess.stdout.on('data', data => {
      namesJSON += data.toString();
    });
    yoloProcess.stderr.on("data", data => console.log(data.toString()));
    yoloProcess.on("close", code => {
      if (code === 0) {
        // Parsear el JSON recibido
        const names = JSON.parse(namesJSON);
      
        resolve({ outputFilePath, names });
      } else {
        reject();
      }
    });
  });
};

module.exports = yolo;