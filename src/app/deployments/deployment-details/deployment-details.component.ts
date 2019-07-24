import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeploymentsService } from '../../core/services/deployments.service';
import { Deployment } from '../../core/interfaces/deployment';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DeploymentLog } from '../../core/interfaces/deployment-log';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deployment-details',
  templateUrl: './deployment-details.component.html',
  styleUrls: ['./deployment-details.component.scss']
})
export class DeploymentDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: CdkVirtualScrollViewport;
  deployment: Deployment;
  logs: DeploymentLog[] = [];
  autoScroll = new FormControl(true);
  private subscription = new Subscription();

  constructor(private deploymentsService: DeploymentsService, private route: ActivatedRoute, private stomp: RxStompService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.deploymentsService.getDeployment(Number(this.route.snapshot.paramMap.get('id'))).subscribe(deployment => {
        this.deployment = deployment;
      });
      this.deploymentsService.getDeploymentLogs(Number(this.route.snapshot.paramMap.get('id'))).subscribe(logs => {
        this.logs = logs;
      });
    }
    this.subscription.add(
      this.stomp.watch(`/exchange/deployment_log_${this.route.snapshot.paramMap.get('id')}`).subscribe(value => {
        this.logs = [...this.logs, {Message: value.body}];
        if (this.autoScroll.value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      })
    );
    this.subscription.add(
      this.autoScroll.valueChanges.subscribe(value => {
        if (value === true) {
          this.myScrollContainer.scrollTo({bottom: 0});
        }
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myScrollContainer.scrollTo({bottom: 0});
    }, 500);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
