import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProjectsService} from '../../core/services/projects.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      ID: [],
      Name: [],
      RepoUrl: [],
      RepoBranch: ['master'],
      RepoUser: ['git'],
      SshKey: [],
    });
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.projectsService.getProject(Number(this.route.snapshot.paramMap.get('id'))).subscribe(project => {
        this.form.patchValue(project);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.projectsService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/projects');
    });
  }
}
