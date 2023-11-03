import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private apiKey = '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';
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Asegúrate de utilizar la URL correcta de la API de OpenAI

  constructor() {}

  sendMessage(message: string): Promise<string> {
    const headers = new Headers({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      prompt: message,
      max_tokens: 50 // Ajusta este valor según tus necesidades
    };
    return fetch(this.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      // Procesa la respuesta de la API de OpenAI
      return data.choices[0].text;
    });
  }
}
