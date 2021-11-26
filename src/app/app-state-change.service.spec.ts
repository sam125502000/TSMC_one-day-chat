import { TestBed } from '@angular/core/testing';

import { AppStateChangeService } from './app-state-change.service';

describe('AppStateChangeService', () => {
  let service: AppStateChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
