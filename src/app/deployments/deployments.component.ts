import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeploymentsService } from '../core/services/deployments.service';
import { Deployment } from '../core/interfaces/deployment';
import { SocketService } from '../core/services/socket.service';
import { StatusMessage } from '../core/interfaces/status-message';
import { Subscription } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.scss']
})
export class DeploymentsComponent implements OnInit, OnDestroy {
  deployments: Deployment[];
  private subscription: Subscription;

  constructor(private deploymentsService: DeploymentsService, private stomp: RxStompService) {
  }

  ngOnInit() {
    this.subscription = this.stomp.watch('/exchange/deployment_status').subscribe((message) => {
      const statusMessage = JSON.parse(message.body);
      this.updateStatus(statusMessage);
    });
    this.deploymentsService.getDeployments().subscribe(deployments => {
      this.deployments = deployments;
    });
  }

  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private updateStatus(message: StatusMessage) {
    this.deployments.find(value => {
      return value.ID === message.ID;
    }).Status = message.Status;
  }
}
