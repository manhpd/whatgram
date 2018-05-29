import { TestBed, inject } from '@angular/core/testing';

import { GetUserPhoto } from './get-user-photo.service';

describe('GetUserPhoto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserPhoto]
    });
  });

  it('should be created', inject([GetUserPhoto], (service: GetUserPhoto) => {
    expect(service).toBeTruthy();
  }));
});
