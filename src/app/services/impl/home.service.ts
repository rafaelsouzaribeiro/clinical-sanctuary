import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectOption } from '../../select-event-location/interface.sellect-option';
import BASEURL from '../../../app.api';
import { Doctor,IHomeService } from '../iservice/home.interface';

@Injectable()
export class HomeService implements IHomeService {

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${BASEURL}/homeDoctors`);
  }

  getUfOptions(): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASEURL}/ufOptions`);
  }

  getCityOptions(uf: string): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(`${BASEURL}/cityOptions?uf=${uf}`);
  }
}