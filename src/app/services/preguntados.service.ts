import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {


  private apiUrl = 'https://opentdb.com/api.php?amount=10';

  constructor(private http: HttpClient) { }

  getRandomizedQuestions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '&random=true');
  }

}
