import { of } from 'rxjs';
import { NgModule } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';

export class RxStompServiceMock {
  watch(path?) {
    return of({body: '{"ID":1,"Status":1}'});
  }
}

@NgModule({
    providers: [{provide: RxStompService, useClass: RxStompServiceMock}],
})
export class RxStompServiceTestingModule {}
