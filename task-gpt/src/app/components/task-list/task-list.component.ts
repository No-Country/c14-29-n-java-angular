import { Component } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import * as OpenAI from 'openai';
import { ChatGptService } from 'src/app/services/chat-gpt.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  suggestions: string[] = [];
  selectedSuggestions: string = '';

    simulatedSuggestions: string[] = [
      'Aspirar el piso', 'Aspirar la alfombra', 'Aspirar la casa', 'Actualizar mis redes sociales',
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
                  this.suggestions = []; // Si el campo de búsqueda está vacío, borra las sugerencias.
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
           this.nuevaTarea = suggestion; // Autocompletar el campo de entrada con la sugerencia seleccionada
               this.suggestions = []; // Borrar las sugerencias después de seleccionar una
                 }
  faPlus: any = faPlus;
  faTrash: any = faTrash;

  fechaHoy = Date.now();

  tareas: { nombre: string, completada: boolean, prioridad: string, editandoPrioridad: boolean, prioridadTemporal: string, checkVisible: boolean }[] = [];

  nuevaTarea: string = '';
  nuevaPrioridad: string = ''; // Nueva propiedad para almacenar la prioridad seleccionada
  prioridades: string[] = ['Low', 'Medium', 'High'];

  sugerencias: string[] = [];
  palabraClave: string = '';
  filtroPrioridad: string = 'All'; // Valor predeterminado para mostrar todas las tareas

 // constructor(private chatGptService: ChatGptService){ }

 // La función obtenerSugerencias() se encarga de obtener las sugerencias utilizando el servicio chatGptService.
 // obtenerSugerencias() {
   // if (this.nuevaTarea.trim() === '') {
      // Si el cuadro de texto está vacío, no solicitar sugerencias y establecer this.sugerencias como un arreglo vacío
     // this.sugerencias = [];
   // } else {
      // Si el cuadro de texto contiene una palabra clave, obtener sugerencias
  // this.chatGptService.getTaskSuggestions(this.palabraClave).subscribe((sugerencias: string[]) => {
  //  this.sugerencias = sugerencias;
   // }
  // );
 // }
//}

agregarTarea() {
  if (this.nuevaTarea.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debes ingresar una tarea antes de agregarla.',
    });
  } else if (this.nuevaPrioridad.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debes seleccionar una prioridad antes de agregar la tarea.',
    });
  } else {
    const prioridad = this.nuevaPrioridad;
    this.tareas.push({
      nombre: this.nuevaTarea,
      completada: false,
      prioridad,
      editandoPrioridad: false,
      prioridadTemporal: '',
      checkVisible: true // Mostrar el icono de marca (v) al agregar la tarea
    });
    this.nuevaTarea = '';
    this.nuevaPrioridad = '';
    this.sugerencias = [];
  }
}


  // la funcion completarTarea(sugerencia) es para que el usuario seleccione una sugerencia para completar la tarea.
//  completarTarea(sugerencia: string) {
  //  this.nuevaTarea = sugerencia; // Completa el campo de entrada con la sugerencia
  //  this.sugerencias = []; // Borra las sugerencias, ya que se ha seleccionado una
  //}


  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);

  }

  marcarComoCompletada(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
  }

  editarPrioridad(index: number) {
    this.tareas[index].editandoPrioridad = true;
    this.tareas[index].prioridadTemporal = this.tareas[index].prioridad;
  }

  guardarPrioridad(index: number) {
    // Puedes agregar validaciones aquí si es necesario
    this.tareas[index].prioridad = this.tareas[index].prioridadTemporal;
    this.tareas[index].editandoPrioridad = false;
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
        backgroundColor = '#007ACC'; // Establece el color azul para Low
        break;
      case 'Medium':
        backgroundColor = '#dabb0f'; // Establece el color amarillo para Medium
        break;
      case 'High':
        backgroundColor = '#FF4500'; // Establece el color rojo para High
        break;
      default:
        backgroundColor = 'transparent'; // Color de fondo predeterminado
    }
  
    return { 'background-color': backgroundColor };
  }
}

