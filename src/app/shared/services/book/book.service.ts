import { Injectable } from '@angular/core';
import {IBook} from "../../models/book/book.models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://localhost:44348/api/Book';

  }

  get(): Observable<Array<IBook>> {

    return this.http.get<Array<IBook>>(this.url);
  }



  create(article: { image: string; title: string; body: string; IsApproved: string }): Observable<IBook>{

    return this.http.post<IBook>(this.url, article);
  }

  delete(id: number): Observable<IBook>{
    return this.http.delete<IBook>(`${this.url}/${id}`);
  }

  update(article: { Name: string; BookId: number; Description: string; body: string }, id: number): Observable<IBook>{
    return this.http.put<IBook>(`${this.url}/${id}`,article);
  }

  getOneBook(id: number): Observable<IBook>{
    return this.http.get<IBook>(`${this.url}/${id}`);
  }
}


