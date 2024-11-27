const inquirer = require("inquirer");
const color = require("colors");
const TareaManager = require("../models/Tarea");


const preguntas = [
  {
    type: "list",
    name: "options",
    message: "Qué quieres hacer?",
    choices: [
      { value: "1", name: "1. Crear tarea" },
      { value: "2", name: "2. Listar tareas" },
      { value: "3", name: "3. Listar tareas completas" },
      { value: "4", name: "4. Listar tareas pendientes" },
      { value: "5", name: "5. Completar tarea(s)" },
      { value: "6", name: "6. Borrar tarea" },
      { value: "0", name: "0. Salir" },
    ],
  },
];



const menu = async () => {
  
  console.log(`${"°°°°°°°°°°°°°°°°°°°°°°°°".green}\n${"Gestor de tareas".blue}\n${"°°°°°°°°°°°°°°°°°°°°°°°°".green}`);
  return (await inquirer.default.prompt(preguntas)).options;
};

const pausa = async () => {
  await inquirer.default.prompt([{ type: "input", name: "enter", message: `Presione ${"enter".green}` }]);
};

const ejecutarMenu = async () => {
  let opcion;
  
  const manager = new TareaManager();
  do {
    opcion = await menu();
    if (opcion === "1") {
      const { nuevaTarea } = await inquirer.default.prompt([{ type: "input", name: "nuevaTarea", message: "Descripcion: " }]); 
      
      await manager.crearTarea(nuevaTarea);
      console.log("Tarea creada correctamente.".green);
    } else if (opcion === "2") {
      const tareasListadas = await manager.listarTareas();
      console.log("Listado de tareas:".blue);
      console.log(tareasListadas);
    } else if (opcion === "3") {
const tareasCompletas = await manager.listarTareasCompletas();
        console.log("Listado de tareas completas:".blue);
        console.log(tareasCompletas);
    } else if (opcion === "4") {
        const tareasPendientes = await manager.listarTareasPendientes();
        console.log("Listado de tareas pendientes:".blue);
        console.log(tareasPendientes);
    } else if (opcion === "5") {
        const tareacomp = await manager.listarTareasPendientes();
        const { idTarea } = await inquirer.default.prompt([{
          type: "list",
          name: "idTarea",
          message: "Seleccione la tarea a completar:",
          choices: tareacomp.map((tarea, index) => ({ 
            value: tarea.id,  // Obtén el id de la tarea
            name: `${index + 1}. ${tarea.descripcion}` 
          })),
        }]);
        await manager.cambiarEstadoTarea(idTarea);
        console.log("Tarea completada con exito.".green);
    } else if (opcion === "6") {
      const tareasBorrar = await manager.listarTareas();
const { idTarea } = await inquirer.default.prompt([{
  type: "list",
  name: "idTarea",
  message: "Seleccione la tarea a borrar:",
  choices: tareasBorrar.map((tarea, index) => ({ 
    value: tarea.id,  // Obtén el id de la tarea
    name: `${index + 1}. ${tarea.descripcion}` 
  })),
}]);
await manager.borrarTarea(idTarea);
console.log("Tarea borrada correctamente.".green);
    } else if (opcion === "0") {
      console.log("Saliendo...".blue);
      process.exit();
    } else {
      console.log("Opción inválida.".red);
    }
    await pausa(); 
  } while (opcion !== "0");
};

module.exports = { menu, ejecutarMenu, pausa };
