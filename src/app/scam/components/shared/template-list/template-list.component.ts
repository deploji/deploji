import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { Template } from '../../../../core/interfaces/template';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
})
export class TemplateListComponent implements OnInit {
  @Input() templates: Template[];
  @Output() selected = new EventEmitter<Template>();

  constructor() { }

  ngOnInit() {
  }

  launch(template: Template) {
    this.selected.emit(template);
  }
}

@NgModule({
  declarations: [TemplateListComponent],
  exports: [TemplateListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TemplateListComponentModule { }
