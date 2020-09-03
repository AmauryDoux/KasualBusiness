import { TestBed } from '@angular/core/testing';

import { OpenAqServiceService } from './open-aq-service.service';

describe('OpenAqServiceService', () => {
  let service: OpenAqServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAqServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
