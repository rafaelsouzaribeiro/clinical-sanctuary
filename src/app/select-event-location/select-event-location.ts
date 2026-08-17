import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption } from '../location-select/interface.sellect-option';

@Component({
  selector: 'app-select-event-location',
  imports: [],
  templateUrl: './select-event-location.html',
  styleUrls: ['./select-event-location.css'],
})
export class SelectEventLocation {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: string | null = null;
  @Output() selectionChange = new EventEmitter<SelectOption>();

  onChange(event: Event): void {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    const opcaoSelecionada = this.options.find(
      (opt) => opt.value === valorSelecionado
    );

    if (opcaoSelecionada) {
      this.selectionChange.emit(opcaoSelecionada);
    }
  }

  
}