import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Template } from '../../core/interfaces/template';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  @Input() templates: Template[];
  @Output() select = new EventEmitter<Template>();

  constructor() { }

  ngOnInit() {
  }

  launch(template: Template) {
    this.select.emit(template);
  }
}
