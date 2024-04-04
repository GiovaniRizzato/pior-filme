import { getAllByRole, getByLabelText, render, RenderResult } from '@testing-library/angular'
import { MovieListComponent } from './movie-list.component'
import { Mock } from 'ts-mockery'
import { MovieService } from '../movie-service/movie.service';
import { AppModule } from '../app.module';
import { Movie, MoviesPageable } from '../movie-service/movie-models';
import userEvent from '@testing-library/user-event'
import { of } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';

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
      expect(headerCells.length).toEqual(4);
      expect(headerCells[0]).toHaveTextContent('ID');
      expect(headerCells[1]).toHaveTextContent('Year');
      const yearFilterInput = getByLabelText(headerCells[1], 'Year')
      expect(yearFilterInput).toBeVisible();
      expect(headerCells[2]).toHaveTextContent('Title');
      expect(headerCells[3]).toHaveTextContent('Winner?');
      const winnerFilterInput = getByLabelText(headerCells[3], 'Winner?')
      expect(winnerFilterInput).toBeVisible();
    });

    it('should have all the correct data in the table', () => { 
      const firstDataRow = getAllByRole(rows[1], 'cell')
      expect(firstDataRow[0]).toHaveTextContent('1');
      expect(firstDataRow[1]).toHaveTextContent('1900');
      expect(firstDataRow[2]).toHaveTextContent('Movie');
      expect(firstDataRow[3]).toHaveTextContent('Yes');

      const secoundDataRow = getAllByRole(rows[2], 'cell')
      expect(secoundDataRow[0]).toHaveTextContent('2');
      expect(secoundDataRow[1]).toHaveTextContent('1901');
      expect(secoundDataRow[2]).toHaveTextContent('Movie Returns');
      expect(secoundDataRow[3]).toHaveTextContent('No');

      const thirdDataRow = getAllByRole(rows[3], 'cell')
      expect(thirdDataRow[0]).toHaveTextContent('3');
      expect(thirdDataRow[1]).toHaveTextContent('1910');
      expect(thirdDataRow[2]).toHaveTextContent('Another Movie?');
      expect(thirdDataRow[3]).toHaveTextContent('Yes');
    });
  });

  describe('Testing pagination wiring', () => {

    describe('when selecting the next page', () => {
      beforeEach(() => {
        Mock.extend(mockMovierService).with({
          getAllMovies: () => of({
            content: [
              {
                id: "4",
              },
              {
                id: "5",
              }
            ] as Movie[],
            totalElements: 5,
          } as MoviesPageable)
        });
        const matPaginator = component.fixture.debugElement.query(By.directive(MatPaginator)).componentInstance as MatPaginator;
        matPaginator.nextPage();
        matPaginator.page.emit();
        component.detectChanges();
      });

      it('should display the changed information on the table', () => {
        //Check if the data shown has changed by checking the "ID" column
        const rows = component.getAllByRole('row');
        expect(rows.length).toBe(3);//header + 2 data rows
        const firstDataRow = getAllByRole(rows[1], 'cell')
        expect(firstDataRow[0]).toHaveTextContent('4');
        const secoundDataRow = getAllByRole(rows[2], 'cell')
        expect(secoundDataRow[0]).toHaveTextContent('5');
      });
    });    
  });

  describe('Testing filtering fields', () => {
    beforeEach(() => {
      //To detect if the data is been changed
      Mock.extend(mockMovierService).with({
        getAllMovies: () => of({
          content: [
            {
              id: "4",
            },
            {
              id: "5",
            },
            {
              id: "6",
            },
          ] as Movie[],
          totalElements: 6,
        } as MoviesPageable)
      });
    });

    it('should be able to filter by year', async () => {
      const getAllMoviesSpy = jest.spyOn(mockMovierService, 'getAllMovies');
      await userEvent.type(component.getByLabelText('Year'), '1993');
      await userEvent.click(component.getByLabelText('Search by year'));

      //Check if the service is been called acording to filter
      expect(getAllMoviesSpy).toHaveBeenCalledWith(0, 3, undefined, 1993);

      //Check if the data shown has changed by checking the "ID" column
      const rows = component.getAllByRole('row');
      const firstDataRow = getAllByRole(rows[1], 'cell');
      expect(firstDataRow[0]).toHaveTextContent('4');
      const secoundDataRow = getAllByRole(rows[2], 'cell');
      expect(secoundDataRow[0]).toHaveTextContent('5');
      const thirdDataRow = getAllByRole(rows[3], 'cell');
      expect(thirdDataRow[0]).toHaveTextContent('6');
    });

    it('should be able to filter by if it won or not', async () => {
      const getAllMoviesSpy = jest.spyOn(mockMovierService, 'getAllMovies');
      const matSelect = component.fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
      matSelect.valueChange.emit("true");

      //Check if the service is been called acording to filter
      expect(getAllMoviesSpy).toHaveBeenCalledWith(0, 3, "true", undefined);

      //Check if the data shown has changed by checking the "ID" column
      const rows = component.getAllByRole('row');
      const firstDataRow = getAllByRole(rows[1], 'cell')
      expect(firstDataRow[0]).toHaveTextContent('4');
      const secoundDataRow = getAllByRole(rows[2], 'cell')
      expect(secoundDataRow[0]).toHaveTextContent('5');
      const thirdDataRow = getAllByRole(rows[3], 'cell')
      expect(thirdDataRow[0]).toHaveTextContent('6');
    });
  });
});