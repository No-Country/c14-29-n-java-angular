import { Component } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as OpenAI from 'openai';
import { ChatGptService } from 'src/app/services/chat-gpt.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  faPlus: any = faPlus;
  faTrash: any = faTrash;

  fechaHoy = Date.now();

  tareas: string[] = [];
  nuevaTarea: string = '';

  sugerencias: string[] = [];
  palabraClave: string = '';

  constructor(private chatGptService: ChatGptService){ }

 // La función obtenerSugerencias() se encarga de obtener las sugerencias utilizando el servicio chatGptService.
  obtenerSugerencias() {
    if (this.nuevaTarea.trim() === '') {
      // Si el cuadro de texto está vacío, no solicitar sugerencias y establecer this.sugerencias como un arreglo vacío
      this.sugerencias = [];
    } else {
      // Si el cuadro de texto contiene una palabra clave, obtener sugerencias
    this.chatGptService.getTaskSuggestions(this.palabraClave).subscribe((sugerencias: string[]) => {
     this.sugerencias = sugerencias;
    });
  }
}

  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push(this.nuevaTarea);
      this.nuevaTarea = '';
      // Restablecer las sugerencias después de agregar una tarea
      this.sugerencias = [];
    }
  }

  // la funcion completarTarea(sugerencia) es para que el usuario seleccione una sugerencia para completar la tarea.
  completarTarea(sugerencia: string) {
    this.nuevaTarea = sugerencia; // Completa el campo de entrada con la sugerencia
    this.sugerencias = []; // Borra las sugerencias, ya que se ha seleccionado una
  }


  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}

