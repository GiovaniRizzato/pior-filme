import { AfterViewInit, Component, EventEmitter, ViewChild} from '@angular/core';
import { Movie, MoviesPageable } from '../movie-service/movie-models';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, map, pipe, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'movie-list-component',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements AfterViewInit{
  displayedColumns = ['id', 'title', 'year', 'producers', 'winner'];

  movieTable: MoviesPageable = {} as MoviesPageable;

  totalData: number = 0;
  MovieData: Movie[] = [];

  dataSource = new MatTableDataSource<Movie>();
  isLoading = true;

  filters: {
    year?: number,
    isWinner?: boolean
  } = {}

  constructor(public movieService: MovieService) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  private resetTable$() {
    return pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.movieService.getAllMovies(this.paginator.pageIndex + 1, this.paginator.pageSize, this.filters.isWinner, this.filters.year)
      }),
      map(movieData => {
        if (movieData == null) return [];
        this.totalData = movieData.totalElements ? movieData.totalElements : 0;
        this.isLoading = false;
        return movieData.content;
      })
    )
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(this.resetTable$())
      .subscribe(movieData => {
        this.MovieData = movieData;
        this.dataSource = new MatTableDataSource(this.MovieData);
      });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    new Observable()
      .pipe(this.resetTable$())
      .subscribe(movieData => {
        this.MovieData = movieData;
        this.dataSource = new MatTableDataSource(this.MovieData);
      });
  }
}
