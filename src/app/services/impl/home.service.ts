import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateOutput,CityOutput } from '../../home/cidades/cidades.interface';
import BASEURL from '../../../app.api';
import { Doctor,IHomeService } from '../iservice/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements IHomeService {

  constructor(private http: HttpClient) {}

  getDoctors(id: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${BASEURL}/homeDoctors?city_id=${id}`);
  }

  getUfOptions(): Observable<StateOutput[]> {
    return this.http.get<StateOutput[]>(`${BASEURL}/states`);
  }

  getCityOptions(id: string): Observable<CityOutput[]> {
    return this.http.get<CityOutput[]>(`${BASEURL}/cities?state_id=${id}`);
  }
}