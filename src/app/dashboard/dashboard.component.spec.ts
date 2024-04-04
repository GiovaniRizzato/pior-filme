import { getAllByRole, render, RenderResult } from '@testing-library/angular'
import { DashboardComponent } from './dashboard.component';
import { Mock } from 'ts-mockery'
import { MovieService } from '../movie-service/movie.service';
import { AppModule } from '../app.module';
import { MinAndMaxWinIntervalForProducers, Movie, StudioWinningCountList, YearWinningCountList } from '../movie-service/movie-models';
import userEvent from '@testing-library/user-event'
import { of } from 'rxjs';


describe('MovieListComponent', () => {
  let component: RenderResult<DashboardComponent, DashboardComponent>;
  const mockMovierService: MovieService = Mock.from<MovieService>({
    getYearsWithMultipleWinners: () => of({
      years: [{
        year: 1990,
        winnerCount: 3
      },
      {
        year: 1993,
        winnerCount: 5
      }]
    } as YearWinningCountList),
    getStudiosWithWinCount: () => of({
      studios: [{
        name: "Studio One",
        winCount: 8
      },
      {
        name: "Studio Two",
        winCount: 6
      },
      {
        name: "Studio Three",
        winCount: 5
      },
      {
        name: "Studio Four",
        winCount: 3
      }]
    } as StudioWinningCountList),
    getWinIntervalForProducers: () => of({
      min: [{
        producer: "Producer",
        interval: 4,
        previousWin: 1989,
        followingWin: 1993
      }],
      max: [{
        producer: "Another Producer",
        interval: 9,
        previousWin: 1990,
        followingWin: 1999
      }]
    } as MinAndMaxWinIntervalForProducers),
    getWinnersByYear: () => of({
      id: "2",
      year: 1901,
      title: "Movie Returns",
      producers: ["Producer Name", "Another Producer Name"],
      winner: false
    } as Movie)
  });

  beforeEach(async () => {
    component = await render(DashboardComponent, {
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

  describe('"List years with multiple winners" table', () => {
    let table: HTMLElement;
    let rows: HTMLElement[];

    beforeEach(() => {
      table = component.getByRole('table', {name: 'List years with multiple winners'});
      rows = getAllByRole(table, 'row');
    });

    it('should have the title', () => {
      component.getByRole('heading', {name: 'List years with multiple winners'});
    });

    it('should have the proper column headers', () => {
      const headerRow = getAllByRole(rows[0], 'columnheader');
      expect(headerRow.length).toEqual(2);
      expect(headerRow[0]).toHaveTextContent('Year');
      expect(headerRow[1]).toHaveTextContent('Win Count');
    });

    it('should have all the correct data in the table', () => { 
      const firstDataRow = getAllByRole(rows[1], 'cell');
      expect(firstDataRow[0]).toHaveTextContent('1990');
      expect(firstDataRow[1]).toHaveTextContent('3');

      const secoundDataRow = getAllByRole(rows[2], 'cell')
      expect(secoundDataRow[0]).toHaveTextContent('1993');
      expect(secoundDataRow[1]).toHaveTextContent('5');
    });
  });

  describe('"Top 3 studios with winners" table', () => {
    let table: HTMLElement;
    let rows: HTMLElement[];

    beforeEach(() => {
      table = component.getByRole('table', {name: 'Top 3 studios with winners'});
      rows = getAllByRole(table, 'row');
    });

    it('should have the title', () => {
      component.getByRole('heading', {name: 'Top 3 studios with winners'});
    });

    it('should have no more than 4 rows (header + 3 data rows)', () => {
      expect(rows.length).toBe(4);
    });

    it('should have the proper column headers', () => {
      const headerRow = getAllByRole(rows[0], 'columnheader');
      expect(headerRow.length).toEqual(2);
      expect(headerRow[0]).toHaveTextContent('Name');
      expect(headerRow[1]).toHaveTextContent('Win Count');
    });

    it('should have all the correct data in the table', () => { 
      const firstDataRow = getAllByRole(rows[1], 'cell')
      expect(firstDataRow[0]).toHaveTextContent('Studio One');
      expect(firstDataRow[1]).toHaveTextContent('8');

      const secoundDataRow = getAllByRole(rows[2], 'cell')
      expect(secoundDataRow[0]).toHaveTextContent('Studio Two');
      expect(secoundDataRow[1]).toHaveTextContent('6');

      const ThirdDataRow = getAllByRole(rows[3], 'cell')
      expect(ThirdDataRow[0]).toHaveTextContent('Studio Three');
      expect(ThirdDataRow[1]).toHaveTextContent('5');
    });
  });

  describe('"Producers with longest and shortest interval between wins" tables', () => {
    it('should have the title', () => {
      component.getByRole('heading', {name: 'Producers with longest and shortest interval between wins'});
    });

    describe('"Maximun" table', () => {
      let table: HTMLElement;
      let rows: HTMLElement[];

      beforeEach(() => {
        table = component.getByRole('table', {name: /Maximun/});
        rows = getAllByRole(table, 'row');
      });

      it('should have the title', () => {
        component.getByRole('heading', {name: 'Maximun'});
      });

      it('should have the proper column headers', () => {
        const headerRow = getAllByRole(rows[0], 'columnheader');
        expect(headerRow.length).toEqual(4);
        expect(headerRow[0]).toHaveTextContent('Producer');
        expect(headerRow[1]).toHaveTextContent('Interval');
        expect(headerRow[2]).toHaveTextContent('Previous Year');
        expect(headerRow[3]).toHaveTextContent('Following Year');
      });

      it('should have all the correct data in the table', () => { 
        const dataRow = getAllByRole(rows[1], 'cell')
        expect(dataRow[0]).toHaveTextContent('Another Producer');
        expect(dataRow[1]).toHaveTextContent('9');
        expect(dataRow[2]).toHaveTextContent('1990');
        expect(dataRow[3]).toHaveTextContent('1999');
      });
    });

    describe('"Minimum" table', () => {
      let table: HTMLElement;
      let rows: HTMLElement[];

      beforeEach(() => {
        table = component.getByRole('table', {name: /Minimum/});
        rows = getAllByRole(table, 'row');
      });

      it('should have the title', () => {
        component.getByRole('heading', {name: 'Minimum'});
      });

      it('should have the proper column headers', () => {
        const headerRow = getAllByRole(rows[0], 'columnheader');
        expect(headerRow.length).toEqual(4);
        expect(headerRow[0]).toHaveTextContent('Producer');
        expect(headerRow[1]).toHaveTextContent('Interval');
        expect(headerRow[2]).toHaveTextContent('Previous Year');
        expect(headerRow[3]).toHaveTextContent('Following Year');
      });

      it('should have all the correct data in the table', () => { 
        const dataRow = getAllByRole(rows[1], 'cell')
        expect(dataRow[0]).toHaveTextContent('Producer');
        expect(dataRow[1]).toHaveTextContent('4');
        expect(dataRow[2]).toHaveTextContent('1989');
        expect(dataRow[3]).toHaveTextContent('1993');
      });
    });
  });

  describe('"List movie winners by year" block', () => {
    let table: HTMLElement;
    let input: HTMLElement;
    let rows: HTMLElement[];

    beforeEach(() => {
      table = component.getByRole('table', {name: 'List movie winners by year'});
      rows = getAllByRole(table, 'row');
      input = component.getByRole('spinbutton', {name: 'Search by year'});
    });

    it('should have the title', () => {
      component.getByRole('heading', {name: 'List movie winners by year'});
    });

    it('should have the proper column headers', () => {
      const headerRow = getAllByRole(rows[0], 'columnheader');
      expect(headerRow.length).toEqual(3);
      expect(headerRow[0]).toHaveTextContent('ID');
      expect(headerRow[1]).toHaveTextContent('Year');
      expect(headerRow[2]).toHaveTextContent('Title');
    });

    it('should have the input to make the search', () => {
      expect(input).toBeVisible;
    });

    describe('after making the search', () => {
      beforeEach(async () => {
        await userEvent.type(input, '1993');
        await userEvent.click(component.getByLabelText('Make the search'));
        rows = getAllByRole(table, 'row');
      });

      it('should have all the correct data in the table', () => { 
        const dataRow = getAllByRole(rows[1], 'cell')
        expect(dataRow[0]).toHaveTextContent('2');
        expect(dataRow[1]).toHaveTextContent('1901');
        expect(dataRow[2]).toHaveTextContent('Movie Returns');
      });
    });    
  });
});