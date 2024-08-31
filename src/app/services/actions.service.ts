import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  findAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.dataUrl);
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.dataUrl, invoice);
  }
}
