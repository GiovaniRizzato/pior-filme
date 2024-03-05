import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all movies list', () => {
    service.getAllMovies(9, 99, true, 2018).subscribe(() => {});
    const req = httpMock.expectOne('https://tools.texoit.com/backend-java/api/movies?page=9&size=99&winner=true&year=2018');
    expect(req.request.method).toBe('GET');
  });

  it('should get the year winning count list', () => {
    service.getYearsWithMultipleWinners().subscribe(() => {});
    const req = httpMock.expectOne('https://tools.texoit.com/backend-java/api/movies?projection=years-with-multiple-winners');
    expect(req.request.method).toBe('GET');
  });

  it('should getStudiosWithWinCount', () => {
    service.getStudiosWithWinCount().subscribe(() => {});
    const req = httpMock.expectOne('https://tools.texoit.com/backend-java/api/movies?projection=studios-with-win-count');
    expect(req.request.method).toBe('GET');
  });

  it('should getWinIntervalForProducers', () => {
    service.getWinIntervalForProducers().subscribe(() => {});
    const req = httpMock.expectOne('https://tools.texoit.com/backend-java/api/movies?projection=max-min-win-interval-for-producers');
    expect(req.request.method).toBe('GET');
  });

  it('should getWinnersByYear', () => {
    service.getWinnersByYear(true, 1993).subscribe(() => {});
    const req = httpMock.expectOne('https://tools.texoit.com/backend-java/api/movies?winner=true&year=1993');
    expect(req.request.method).toBe('GET');
  });
});
