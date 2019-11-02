import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export class FilterableComponent {
  options: any[] = [];
  filteredOptions: any[] = [];
  filterControl = new FormControl();
  subscription: Subscription;

  constructor() {
    this.subscription = this.filterControl.valueChanges.subscribe(() => {
      this.filter();
    });
  }

  protected filter() {
    if (!this.filterControl.value || this.filterControl.value.length === 0 || !this.options || this.options.length === 0) {
      this.filteredOptions = this.options;
      return;
    }
    const filterIds = this.filterControl.value.map(value => value.ID);
    this.filteredOptions = this.options.filter(value => filterIds.includes(value.ID));
  }
}
