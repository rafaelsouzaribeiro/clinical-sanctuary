import { Component, OnInit, Output, EventEmitter, output } from '@angular/core';
import { SelectCidades } from "./cidades.interface";
import { HomeService } from '../../services/impl/home.service';

@Component({
  selector: 'app-cidades',
  imports: [],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades implements OnInit {
    @Output() cityChange = new EventEmitter<string>();
    @Output() searchChange = new EventEmitter<string>();

    public ufOptions: SelectCidades[] = [];
    public cityOptions: SelectCidades[] = [];

    public selectedUf = '';
    public selectedCity = '';
    public searchTerm = '';

    constructor(private homeService: HomeService) {}

    ngOnInit(): void {
        this.homeService.getUfOptions().subscribe((options) => {
            this.ufOptions = options;
            this.selectedUf = this.ufOptions[0]?.value ?? '';
            this.loadCities(this.selectedUf);
        });
    }

    private loadCities(uf: string): void {
        this.cityOptions = [];
        this.selectedCity = '';

        this.homeService.getCityOptions(uf).subscribe((options) => {
            this.cityOptions = options;
            this.selectedCity = options[0]?.id ?? '';
            this.cityChange.emit(this.selectedCity);
        });
    }

    onUfSelect(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.selectedUf = value;
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