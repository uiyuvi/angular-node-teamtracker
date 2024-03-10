import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockTrackerService } from '../components/add-member/add-member.component.spec';
import { TrackerRequestsService } from '../service/tracker-requests.service';

import { HttpConfigInterceptor } from './http-config.interceptor';

describe('HttpConfigInterceptor', () => {
  let service: TrackerRequestsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        HttpConfigInterceptor,
        {provide:TrackerRequestsService, useClass: MockTrackerService, multi: true}
      ]
    });
    
    service = TestBed.inject(TrackerRequestsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // it('#should be created', () => {
  //   const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
  //   expect(interceptor).toBeTruthy();
  // });

});
