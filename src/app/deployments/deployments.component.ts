import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeploymentsService } from '../core/services/deployments.service';
import { Deployment } from '../core/interfaces/deployment';
import { StatusMessage } from '../core/interfaces/status-message';
import { of, Subscription } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Collection } from '../core/utils/collection';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Page } from '../core/interfaces/page';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.scss']
})
export class DeploymentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;
  private currentPage: Page = {page: 0, limit: 10, orderBy: 'id desc'};
  deployments: Collection<Deployment>;
  columnsToDisplay = ['status', 'id', 'application', 'inventory', 'version', 'time', 'actions'];
  filters: FormGroup;

  constructor(
    private router: Router,
    private deploymentsService: DeploymentsService,
    private stomp: RxStompService,
    private fb: FormBuilder
  ) {
    this.filters = fb.group({
      application_id: [],
      inventory_id: []
    });
    this.filters.valueChanges.subscribe(value => {
      this.reload(this.currentPage, value);
    });
  }

  ngOnInit() {
    this.subscription = this.stomp.watch('/exchange/deployment_status').subscribe((message) => {
      const statusMessage = JSON.parse(message.body);
      this.updateStatus(statusMessage);
    });
    this.deploymentsService.getDeployments().subscribe(deployments => {
      this.deployments = deployments;
      this.paginator.length = deployments.totalCount;
    });
  }

  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private updateStatus(message: StatusMessage) {
    const deployment = this.deployments.items.find(value => {
      return value.ID === message.ID;
    });
    let $deployment = of(deployment);
    if (!deployment) {
      $deployment = this.deploymentsService.getDeployment(message.ID).pipe(
        tap(value => this.deployments.items.push(value))
      );
    }
    $deployment.subscribe(value => {
      value.Status = message.Status;
    });
  }

  relaunch(deployment: Deployment) {
    this.deploymentsService.save({
      ApplicationID: deployment.ApplicationID,
      InventoryID: deployment.InventoryID,
      Version: deployment.Version
    }).subscribe(value => {
      this.deployments.items.push(value);
      this.router.navigateByUrl(`/deployments/${value.ID}`);
    });
  }

  page(pageEvent: PageEvent) {
    this.currentPage = {page: pageEvent.pageIndex, limit: pageEvent.pageSize, orderBy: 'id desc'};
    this.reload(this.currentPage, this.filters.value);
  }

  private reload(page: Page, filters: any) {
    this.deploymentsService.getDeployments(filters, page).subscribe(value => {
      this.deployments = value;
      this.paginator.length = value.totalCount;
    });
  }
}
