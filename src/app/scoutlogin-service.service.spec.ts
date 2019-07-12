import { TestBed } from '@angular/core/testing';

import { ScoutloginServiceService } from './scoutlogin-service.service';

describe('ScoutloginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoutloginServiceService = TestBed.get(ScoutloginServiceService);
    expect(service).toBeTruthy();
  });
});
