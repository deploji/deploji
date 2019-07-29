import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplatesService } from '../../core/services/templates.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private templatesService: TemplatesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      ID: [],
      Name: [],
      Project: [],
      Inventory: [],
      Playbook: [],
      SshKey: [],
    });
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
