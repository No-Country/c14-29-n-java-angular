import { Component } from '@angular/core';
import * as openai from 'openai';
import { ChatgptService } from 'src/app/services/chatgpt.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 userMessage: string = '';
  chatResponse: string = ''; // Para mostrar la respuesta del chat
  suggestions: string[] = ['Manzana', 'Banana', 'Cereza', 'Dátil', 'Frambuesa', 'Kiwi', 'Mango'];
  selectedFruit: string;

  constructor(private chatService: ChatgptService) {}

  submitMessage() {
    if (this.userMessage.trim() !== '') {
      this.chatService.sendMessage(this.userMessage)
        .then(response => {
          this.chatResponse = response;
        });
      this.userMessage = ''; // Limpiar el campo de entrada después de enviar el mensaje
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedFruit = event.item;
    // Aquí puedes realizar alguna acción con la sugerencia seleccionada
  }

}
