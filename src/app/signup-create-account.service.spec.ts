import { TestBed } from '@angular/core/testing';

import { SignupCreateAccountService } from './signup-create-account.service';

describe('SignupCreateAccountService', () => {
  let service: SignupCreateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupCreateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
