import { TestBed } from '@angular/core/testing';

import { DatatransferService } from './datatransfer.service';

describe('DatatransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatransferService = TestBed.get(DatatransferService);
    expect(service).toBeTruthy();
  });
});
