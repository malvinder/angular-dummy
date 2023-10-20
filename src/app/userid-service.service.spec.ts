import { TestBed } from '@angular/core/testing';

import { UseridServiceService } from './userid-service.service';

describe('UseridServiceService', () => {
  let service: UseridServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseridServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
