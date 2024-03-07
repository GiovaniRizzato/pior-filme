import { getAllByRole, getByLabelText, render, RenderResult } from '@testing-library/angular'
import { MovieListComponent } from './movie-list.component'
import { Mock } from 'ts-mockery'
import { MovieService } from '../movie-service/movie.service';
import { AppModule } from '../app.module';
import { Movie, MoviesPageable } from '../movie-service/movie-models';
import { of } from 'rxjs';

describe('MovieListComponent', () => {
  let component: RenderResult<MovieListComponent, MovieListComponent>;
  const mockMovierService: MovieService = Mock.from<MovieService>({
    getAllMovies: () => of({
      content: [
        {
          id: "1",
          year: 1900,
          title: "Movie",
          producers: ["Producer Name"],
          winner: true
        },
        {
          id: "2",
          year: 1901,
          title: "Movie Returns",
          producers: ["Producer Name", "Another Producer Name"],
          winner: false
        },
        {
          id: "3",
          year: 1910,
          title: "Another Movie?",
          producers: ["Another Producer Name"],
          winner: true
        },
      ] as Movie[],
      totalElements: 6,
    } as MoviesPageable)
  });

  beforeEach(async () => {
    component = await render(MovieListComponent, {
      imports: [
        AppModule
      ],
      componentProviders: [
        { provide: MovieService, useFactory: () => mockMovierService }
      ]
    })
  })

  
  it('should be created', () => { 
    expect(component).toBeTruthy();
  });

  it('should have page title', () => {
    component.getByRole('heading', {
      name: 'List movies'
    })
  });
  
  describe('Testing table heading and data', () => {
    let rows: HTMLElement[];
    beforeEach(() => {
      rows = component.getAllByRole('row');
    });

    it('should have all the headers in the table', () => { 
      const headerCells = getAllByRole(rows[0], 'columnheader')
      expect(headerCells.length).toEqual(5);
      expect(headerCells[0]).toHaveTextContent('ID');
      expect(headerCells[1]).toHaveTextContent('Title');
      expect(headerCells[2]).toHaveTextContent('Year');
      const yearFilterInput = getByLabelText(headerCells[2], 'Year')
      expect(yearFilterInput).toBeVisible();
      expect(headerCells[3]).toHaveTextContent('Producers');
      expect(headerCells[4]).toHaveTextContent('Did it win?');
      const winnerFilterInput = getByLabelText(headerCells[4], 'Did it win?')
      expect(winnerFilterInput).toBeVisible();
    });

    it('should have all the correct data in the table', () => { 
      const firstDataRow = getAllByRole(rows[1], 'cell')
      expect(firstDataRow[0]).toHaveTextContent('1');
      expect(firstDataRow[1]).toHaveTextContent('Movie');
      expect(firstDataRow[2]).toHaveTextContent('1900');
      expect(firstDataRow[3]).toHaveTextContent('Producer Name');
      expect(firstDataRow[4]).toHaveTextContent('Yes');

      const secoundDataRow = getAllByRole(rows[2], 'cell')
      expect(secoundDataRow[0]).toHaveTextContent('2');
      expect(secoundDataRow[1]).toHaveTextContent('Movie Returns');
      expect(secoundDataRow[2]).toHaveTextContent('1901');
      expect(secoundDataRow[3]).toHaveTextContent('Producer Name, Another Producer Name');
      expect(secoundDataRow[4]).toHaveTextContent('No');

      const thirdDataRow = getAllByRole(rows[3], 'cell')
      expect(thirdDataRow[0]).toHaveTextContent('3');
      expect(thirdDataRow[1]).toHaveTextContent('Another Movie?');
      expect(thirdDataRow[2]).toHaveTextContent('1910');
      expect(thirdDataRow[3]).toHaveTextContent('Another Producer Name');
      expect(thirdDataRow[4]).toHaveTextContent('Yes');
    });
  })
})