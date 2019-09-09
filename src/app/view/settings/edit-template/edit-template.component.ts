import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplatesService } from '../../../core/services/templates.service';
import { TemplateForm } from '../../../core/forms/template.form';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  form = new TemplateForm();

  constructor(
    private templatesService: TemplatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.templatesService.getTemplate(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.templatesService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/templates');
    });
  }
}
