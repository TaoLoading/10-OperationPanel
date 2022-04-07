import { TestBed } from '@angular/core/testing';

import { ChangeModalService } from './change-modal.service';

describe('ChangeModalService', () => {
  let service: ChangeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
