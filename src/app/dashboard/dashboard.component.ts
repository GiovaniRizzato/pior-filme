import { Component, OnInit } from '@angular/core';
import { Movie, StudioWinningCount, WinIntervalForProducers, YearWinningCount } from '../movie-service/movie-models';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  multipleWinnerTableColumns: string[] = ['year', 'winnerCount'];
  multipleWinnerTableDataSource = new MatTableDataSource<YearWinningCount>([]);

  topStudiosTableColumns: string[] = ['name', 'winCount'];
  topStudiosTableDataSource = new MatTableDataSource<StudioWinningCount>([]);

  maxProducerIntervalTableColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  maxProducerIntervalTableDataSource = new MatTableDataSource<WinIntervalForProducers>([]);
  minProducerIntervalTableColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  minProducerIntervalTableDataSource = new MatTableDataSource<WinIntervalForProducers>([]);

  movieByYeayTableColumns: string[] = ['id', 'year', 'title'];
  movieByYeayTableDataSource = new MatTableDataSource<Movie>([]);

  searchedYear!: number;

  constructor (private readonly movieService: MovieService) {}

  ngOnInit() {
    this.resetMultipleWinnerTable();
    this.resetTopStudiosTable();
    this.resetProducerIntervalTable();
  }

  resetMultipleWinnerTable() {
    this.movieService.getYearsWithMultipleWinners().subscribe(data => {
      this.multipleWinnerTableDataSource.data = data.years;
    });
  }

  resetTopStudiosTable() {
    this.movieService.getStudiosWithWinCount().subscribe(data => {
      this.topStudiosTableDataSource.data = data.studios.slice(0, 3);
    });
  }

  resetProducerIntervalTable() {
    this.movieService.getWinIntervalForProducers().subscribe(data => {
      this.maxProducerIntervalTableDataSource.data = data.max;
      this.minProducerIntervalTableDataSource.data = data.min;
    });
  }

  searchMovieByYear(year: number) {
    if(year) {
      this.movieService.getWinnersByYear(true, year).subscribe(data => {
        this.movieByYeayTableDataSource.data = data;
      });
    }
  }
}
