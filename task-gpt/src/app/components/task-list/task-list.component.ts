import { Component } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push(this.nuevaTarea);
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}

