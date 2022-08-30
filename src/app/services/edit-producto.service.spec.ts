import { TestBed } from '@angular/core/testing';

import { EditProductoService } from './edit-producto.service';

describe('EditProductoService', () => {
  let service: EditProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
