import { TestBed } from '@angular/core/testing';

import { VouchersService } from './vouchers.service';

describe('VouchersService', () => {
  let service: VouchersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VouchersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
