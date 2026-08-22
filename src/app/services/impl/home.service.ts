import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectCidades } from '../../home/cidades/cidades.interface';
import BASEURL from '../../../app.api';
import { Doctor,IHomeService } from '../iservice/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements IHomeService {

  constructor(private http: HttpClient) {}

  getDoctors(id: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${BASEURL}/homeDoctors?cityId=${id}`);
  }

  getUfOptions(): Observable<SelectCidades[]> {
    return this.http.get<SelectCidades[]>(`${BASEURL}/ufOptions`);
  }

  getCityOptions(uf: string): Observable<SelectCidades[]> {
    return this.http.get<SelectCidades[]>(`${BASEURL}/cityOptions?uf=${uf}`);
  }
}