import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtercomponent',
  templateUrl: './filtercomponent.component.html',
  styleUrls: ['./filtercomponent.component.css']
})
export class FiltercomponentComponent {

  @Output() filterEvent = new EventEmitter<string>();

  selectedFilter: string = 'All';

  selected(e : Event){
    this.selectedFilter = (<HTMLInputElement>e.target).value
    this.filterEvent.emit(this.selectedFilter);
  } 

}
