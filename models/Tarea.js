const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

class Tarea {
    constructor(descripcion) {
        this.id = uuidv4(); // Genera un ID único
        this.descripcion = descripcion;
        this.estado = false; // Estado inicial de la tarea
    }
}

class TareaManager {
    constructor() {
        this.archivo = "./db/db.json"; // Ruta del archivo JSON
        this.cargarTareas(); // Carga las tareas desde el archivo JSON
    }

    cargarTareas() {
        try {
            const data = fs.readFileSync(this.archivo, 'utf8');
            this.tareas = JSON.parse(data);
        } catch (error) {
            this.tareas = []; // Si no existe el archivo, inicializa un array vacío
        }
    }

    guardarTareas() {
        const data = JSON.stringify(this.tareas);
        fs.writeFileSync(this.archivo, data);
    }


    crearTarea(descripcion) {
        const nuevaTarea = new Tarea(descripcion);
        this.tareas.push(nuevaTarea);
        this.guardarTareas();
    }

    listarTareasPendientes() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.filter(tarea => !tarea.estado).map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }

    listarTareas() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }

    listarTareasCompletas() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.filter(tarea => tarea.estado).map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }

    borrarTarea(id) {
        const index = this.tareas.findIndex(tarea => tarea.id === id);
        if (index === -1) {
            console.log("Índice inválido.");
            return;
        }
        this.tareas.splice(index, 1);
        this.guardarTareas();
    }

    cambiarEstadoTarea(id) {
        const index = this.tareas.findIndex(tarea => tarea.id === id);
        if (index === -1) {
            console.log("Índice inválido.");
            return;
        }
        this.tareas[index].estado = true; // Cambia el estado a true
        this.guardarTareas();
    }
}

module.exports = TareaManager; 