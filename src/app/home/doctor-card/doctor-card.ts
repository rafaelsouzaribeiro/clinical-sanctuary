import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { HomeService } from '../../services/impl/home.service';
import { Doctor } from '../../services/iservice/home.interface';
import generateSlug  from '../../utils/generate.slug';

@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink, NgClass],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard {
  selectedCity = input.required<string>();
  

  public doctors = toSignal(
    toObservable(this.selectedCity).pipe(
      switchMap(city => this.homeService.getDoctors(city))
    ),
    { initialValue: [] as Doctor[] }
  );

  constructor(private homeService: HomeService) {}

  avatarClass(index: number): string {
    const cycle = (index % 3) + 1;
    return `avatar--doctor-${cycle}`;
  }

  consultaLink(doctor: Doctor): string[] {
    return ['/consultas', doctor.slug, doctor.id];
  }

  perfilLink(doctor: Doctor): string[] {
    return ['/perfil', generateSlug(doctor.specialty), doctor.slug];
  }
}