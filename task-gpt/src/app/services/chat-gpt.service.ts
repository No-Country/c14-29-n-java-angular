import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import * as openai from 'openai';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

//  private apiKey = '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';
 // private apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';


  constructor(private http: HttpClient) {

  }

 // getTaskSuggestions(keyword: string): Observable<string[]> {
   // const headers = new HttpHeaders({
    //  'Content-Type': 'application/json',
    //  'Authorization': `Bearer ${this.apiKey}`
   // });

   // const requestBody = {
     // prompt: keyword, // Utiliza "keyword"en el objeto de solicitud.
   //   max_tokens: 50 // Define el número máximo de tokens de respuesta.
  //  };

    // Espera explícitamente una respuesta de tipo "string[]".
    //return this.http.post<string[]>(this.apiUrl, requestBody, { headers });
//  }


}
