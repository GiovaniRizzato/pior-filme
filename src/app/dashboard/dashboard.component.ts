import { Component, OnInit } from '@angular/core';
import { StudioWinningCount, YearWinningCount } from '../movie-service/movie-models';
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

  topStudiosTableColumns: string[] = ['year', 'winnerCount'];
  topStudiosTableDataSource = new MatTableDataSource<StudioWinningCount>([]);

  constructor (private readonly movieService: MovieService) {}

  ngOnInit() {
    this.resetMultipleWinnerTable();
  }

  resetMultipleWinnerTable() {
    this.movieService.getYearsWithMultipleWinners().subscribe((data) => {
      this.multipleWinnerTableDataSource.data = data.years;
    });
  }

  resetTopStudiosTable() {
    this.movieService.getStudiosWithWinCount().subscribe((data) => {
      this.topStudiosTableDataSource.data = data.studios;
    });
  }
}
