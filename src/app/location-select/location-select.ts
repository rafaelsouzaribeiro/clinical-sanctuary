import { Component,Input } from '@angular/core';
import { SelectOption } from './interface.sellect-option';

@Component({
  selector: 'app-location-select',
  imports: [],
  templateUrl: './location-select.html',
  styleUrls: ['./location-select.css'],
})
export class LocationSelect {
  @Input() id:string='';
  @Input() name:string='';
  @Input() options:SelectOption[]=[];
}
