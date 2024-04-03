import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Movie, MoviesPageable } from '../movie-service/movie-models';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, map, pipe, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-list-component',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, AfterViewInit{
  displayedColumns = ['id', 'year', 'title','winner'];
  movieTable: MoviesPageable = {} as MoviesPageable;
  dataSource = new MatTableDataSource<Movie>();
  totalData = 0;

  isLoading = true;

  filters: {
    year?: number,
    isWinner?: boolean
  } = {}

  constructor(public movieService: MovieService) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  private resetTable$(pageIndex: number = this.paginator.pageIndex, pageSize: number = this.paginator.pageSize) {
    return pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.movieService.getAllMovies(pageIndex, pageSize, this.filters.isWinner, this.filters.year)
      }),
      map(movieData => {
        if (movieData == null) return [];
        this.totalData = movieData.totalElements ? movieData.totalElements : 0;
        this.isLoading = false;
        return movieData.content;
      })
    )
  }

  ngOnInit() {
    new Observable()
      .pipe(this.resetTable$(0, 3))
      .subscribe(movieData => {
        this.dataSource = new MatTableDataSource(movieData);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    new Observable()
      .pipe(this.resetTable$())
      .subscribe(movieData => {
        this.dataSource = new MatTableDataSource(movieData);
      });
  }
}
