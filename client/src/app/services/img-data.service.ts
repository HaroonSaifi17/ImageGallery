import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { DataInterface } from './data-interface'
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class ImgDataService {
  constructor(private http: HttpClient) { }
  getData(): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(environment.api)
  }
}
