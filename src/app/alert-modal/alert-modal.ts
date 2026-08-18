import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModal {
  @Input() showModal: boolean = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Input() message: string = '';  

  public closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(false);
  }
}
