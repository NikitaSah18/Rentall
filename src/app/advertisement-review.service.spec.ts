import { TestBed } from '@angular/core/testing';

import { AdvertisementReviewService } from './advertisement-review.service';

describe('AdvertisementReviewService', () => {
  let service: AdvertisementReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
