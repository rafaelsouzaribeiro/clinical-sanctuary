import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { HomeService } from '../services/impl/home.service';
import { Doctor } from '../services/iservice/home.interface';
import generateSlug from '../utils/generate.slug';

@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink, NgClass],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard implements OnChanges {
  @Input() selectedCity!: string;

  public doctors: Doctor[] = [];

  constructor(private homeService: HomeService) {}


  ngOnChanges(changes: SimpleChanges): void {
      this.selectedCity = changes['selectedCity'].currentValue;
      console.log('Selected City changed:', this.selectedCity);
      this.homeService.getDoctors(this.selectedCity).subscribe((doctors) => {
        this.doctors = doctors;
        console.log('Doctors fetched:', this.doctors);
      });
  }

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