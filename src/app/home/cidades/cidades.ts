import { Component, OnInit, Output, EventEmitter, output } from '@angular/core';
import { CityOutput,StateOutput } from "./cidades.interface";
import { HomeService } from '../../services/impl/home.service';
import { UUID } from 'node:crypto';

@Component({
  selector: 'app-cidades',
  imports: [],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades implements OnInit {
    @Output() cityChange = new EventEmitter<string>();
    @Output() searchChange = new EventEmitter<string>();

    public ufOptions: StateOutput[] = [];
    public cityOptions: CityOutput[] = [];

    public selectedID = '';
    public selectedCity = '';
    public searchTerm = '';

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
        this.selectedCity = '';

        this.homeService.getCityOptions(state_id).subscribe((options) => {
            this.cityOptions = options;
            this.selectedCity = options[0]?.city_id ?? '';
            this.cityChange.emit(this.selectedCity);
        });
    }

    onUfSelect(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedID = value;
        this.loadCities(value);
    }

    onCitySelect(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedCity = value;
        this.cityChange.emit(value);
    }

    onSearchChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchChange.emit(value);
    }
}