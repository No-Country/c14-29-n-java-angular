import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  suggestions: string[] = [];
  selectedSuggestions: string = '';

  simulatedSuggestions: string[] = [      'Aspirar el piso', 'Aspirar la alfombra', 'Aspirar la casa', 'Actualizar mis redes sociales',
  'Configurar una reunión de equipo en el trabajo', 'Cambiar un filtro de aire',
  'Comprar los comestibles', 'Completar el informe mensual para el jefe',
  'Comprobar y actualizar las redes sociales', 'Comprobar y responder a los correos electrónicos importantes',
  'Estudiar para el próximo examen', 'Escribir una entrada en el diario',
  'Festejar mi cumpleaños', 'Festejar el cumpleaños de mi amigo/a', 'Festejar el cumpleaños de mi novia/esposa', 'Festejar el cumpleaños de mi novio/esposo',
  'Hacer ejercicio durante 30 minutos', 'Hacer ejercicio', 'Hacer las compras', 'Hacer la cena', 'Hacer la compra de comestibles',
  'Hacer una lista de tareas pendientes para la semana', 'Hacer una lista de tareas pendientes', 'Hacer los quehaceres', 'Hacer una limpieza profunda de la casa',
  'Hacer una cita con el dentista', 'Hacer una lista de metas a largo plazo', 'Hacer una lista de los lugares que me gustaría visitar en mis próximas vacaciones',
  'Ir a visitar a mamá', 'Ir a visitar a papá', 'Ir a visitar a la abuela', 'Ir a visitar al abuelo',
  'Investigar y reservar unas vacaciones', 'Investigar sobre el calentamiento global', 'Investigar sobre moda','Investigar opciones de seguro de salud', 'Investigar y seleccionar una compañia de cable',
  'Leer un capítulo de mi libro favorito', 'Leer mi blog favorito', 'Leer las noticias del día en el diario',
  'Limpiar la alacena', 'Limpiar el auto', 'Limpiar la caja de arena del gato', 'Limpiar los espejos', 'Limpiar la terraza', 'Limpiar el comedor',
  'Limpiar la sala de estar', 'Limpiar el patio', 'Limpiar los dormitorios', 'Limpiar la cocina', 'Limpiar el cuarto de baño',
  'Llevar a los niños a la escuela', 'Llevar a mi hijo/a a clase de música', 'Llevar a mi hijo/a a fútbol', 'Llevar a los niños a la fiesta de cumpleaños',
  'Llevar a mamá a clase de yoga', 'Llevar a papá a clase de yoga', 'Llevar la comida a mamá', 'Llevar la comida a papá', 'Llevar el coche al taller para el mantenimiento',
  'Llevar al perro al parque', 'Llevar al gato al veterinario', 'Llevar al perro al veterinario', 'Llamar al médico para hacer una cita', 'Llevar a cabo una revisión de desempeño laboral',
  'Ordenar el dormitorio', 'Ordenar la casa', 'Organizar el armario y donar ropa no deseada', 'Organizar una reunión familiar',
  'Preparar una lista de compras de regalos de cumpleaños', 'Planificar una cena especial', 'Podar el césped', 'Plantar flores',
  'Practicar deportes', 'Practicar los pasos de baile', 'Pagar las facturas de servicios públicos', 'Preparar una presentación para el trabajo',
  'Planificar el menú de la semana', 'Planificar el fin de semana', 'Planificar el día de hoy', 'Planificar las vacaciones',
  'Responder a los correos electrónicos importantes', 'Recoger a los niños de clase', 'Redactar un informe', 'Realizar un seguimiento de las tareas de los proyectos en el trabajo', 'Revisar y actualizar mi currículum vitae',
  'Revisar y archivar documentos importantes',
  'Subir mis fotos a mis redes sociales'
    
  ];

  onTareaInput(event: any) {
    const tareaTerm = event.target.value.toLowerCase().trim();
    if (tareaTerm === '') {
      this.suggestions = [];
      return;
    }
    this.suggestions = this.filterSuggestions(tareaTerm);
  }

  filterSuggestions(tareaTerm: string): string[] {
    return this.simulatedSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(tareaTerm)
    );
  }

  selectSuggestion(suggestion: string) {
    this.nuevaTarea = suggestion;
    this.suggestions = [];
  }

  faPlus: any = faPlus;
  faTrash: any = faTrash;
  faPen: any = faPen;

  fechaHoy = Date.now();

  tareas: {
    nombre: string,
    completada: boolean,
    prioridad: string,
    editandoPrioridad: boolean,
    prioridadTemporal: string,
    checkVisible: boolean,
  }[] = [];

  nuevaTarea: string = '';
  nuevaPrioridad: string = '';
  prioridades: string[] = ['Low', 'Medium', 'High'];

  sugerencias: string[] = [];
  palabraClave: string = '';
  filtroPrioridad: string = 'All';
  mensajeAdvertencia: string = '';
  tareaEditando: number | null = null;

  ngOnInit() {
    const storedTareas = localStorage.getItem('tareas');
    if (storedTareas) {
      this.tareas = JSON.parse(storedTareas);
    }
  }

  agregarTarea() {
    if (this.nuevaTarea.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must enter a task before adding it.',
      });
    } else if (this.nuevaPrioridad.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must select a priority before adding the task.',
      });
    } else {
      const prioridad = this.nuevaPrioridad;
      this.tareas.push({
        nombre: this.nuevaTarea,
        completada: false,
        prioridad,
        editandoPrioridad: false,
        prioridadTemporal: '',
        checkVisible: true,
      });
      this.nuevaTarea = '';
      this.nuevaPrioridad = '';
      this.sugerencias = [];
      this.actualizarTareasEnLocalStorage();
    }
  }
// Método para activar el modo de edición
editarTarea(index: number) {
  this.tareaEditando = index;
}

// Método para desactivar el modo de edición
cancelarEdicion(index: number) {
  this.tareas[index].prioridadTemporal = this.tareas[index].prioridad;
  this.tareas[index].editandoPrioridad = false;
}

// Método para guardar la tarea editada
guardarEdicion(index: number) {
  this.tareaEditando = null;
}

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    this.actualizarTareasEnLocalStorage();
  }

  marcarComoCompletada(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
    this.actualizarTareasEnLocalStorage();
  }

  editarPrioridad(index: number) {
    this.tareas[index].editandoPrioridad = true;
    this.tareas[index].prioridadTemporal = this.tareas[index].prioridad;
  }

  guardarPrioridad(index: number) {
    this.tareas[index].prioridad = this.tareas[index].prioridadTemporal;
    this.tareas[index].editandoPrioridad = false;
    this.actualizarTareasEnLocalStorage();
  }

  get tareasFiltradas() {
    if (this.filtroPrioridad === 'All') {
      return this.tareas;
    } else {
      return this.tareas.filter((tarea) => tarea.prioridad === this.filtroPrioridad);
    }
  }

  getCardBackground(prioridad: string): any {
    let backgroundColor = '';
    switch (prioridad) {
      case 'Low':
        backgroundColor = '#007ACC';
        break;
      case 'Medium':
        backgroundColor = '#dabb0f';
        break;
      case 'High':
        backgroundColor = '#FF4500';
        break;
      default:
        backgroundColor = 'transparent';
    }
    return { 'background-color': backgroundColor };
  }

  onTareasDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.tareasFiltradas, event.previousIndex, event.currentIndex);
    this.actualizarTareasEnLocalStorage();
  }

  private actualizarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}
















