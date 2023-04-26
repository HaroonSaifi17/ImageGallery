import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { DataInterface } from './data-interface'
@Injectable({
  providedIn: 'root',
})
export class ImgDataService {
  constructor(private http: HttpClient) { }
  getData(): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>('http://localhost:4040/')
  }
}
