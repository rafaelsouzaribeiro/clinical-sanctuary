import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityOutput, StateOutput } from "./cidades.interface";
import { HomeService } from '../../services/impl/home.service';

@Component({
  selector: 'app-cidades',
  imports: [CommonModule, FormsModule],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades implements OnInit {
  @Output() cityChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  public ufOptions: StateOutput[] = [];
  public cityOptions: CityOutput[] = [];
  public filteredCityOptions: CityOutput[] = [];

  public selectedID = '';
  public selectedCity = '';
  public searchTerm = '';

  public cityInputValue = '';
  public isCityDropdownOpen = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUfOptions().subscribe((options) => {
      this.ufOptions = options;
      this.selectedID = this.ufOptions[0]?.state_id ?? '';
      this.loadCities(this.selectedID);
    });
  }

  private loadCities(state_id: string): void {
    this.cityOptions = [];
    this.filteredCityOptions = [];
    this.selectedCity = '';
    this.cityInputValue = '';

    this.homeService.getCityOptions(state_id).subscribe((options) => {
      this.cityOptions = options;
      this.filteredCityOptions = options;

      const first = options[0];
      if (first) {
        this.selectedCity = first.city_id;
        this.cityInputValue = first.name_city;
        this.cityChange.emit(this.selectedCity);
      }
    });
  }

  onUfSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedID = value;
    this.loadCities(value);
  }

  onCityInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.cityInputValue = value;
    this.isCityDropdownOpen = true;

    const term = value.trim().toLowerCase();
    this.filteredCityOptions = term
      ? this.cityOptions.filter(c => c.name_city.toLowerCase().includes(term))
      : this.cityOptions;
  }

  onCityInputFocus(): void {
    this.isCityDropdownOpen = true;
    this.filteredCityOptions = this.cityOptions;
  }

  onCityInputBlur(): void {
    setTimeout(() => (this.isCityDropdownOpen = false), 150);
  }

  selectCity(option: CityOutput): void {
    this.selectedCity = option.city_id;
    this.cityInputValue = option.name_city;
    this.isCityDropdownOpen = false;
    this.cityChange.emit(this.selectedCity);
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchChange.emit(value);
  }
}