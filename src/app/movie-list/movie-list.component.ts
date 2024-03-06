import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { Movie, MoviesPageable } from '../movie-service/movie-models';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

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

  constructor(public movieService: MovieService) {}

  @ViewChild('paginator') paginator!: MatPaginator;

  getTableData$(pageIndex: number, pageSize: number) {
    return this.movieService.getAllMovies(pageIndex, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;
        return this.getTableData$(this.paginator.pageIndex + 1, this.paginator.pageSize);
      }),
      map(movieData => {
        if (movieData == null) return [];
        this.totalData = movieData.totalElements ? movieData.totalElements : 0;
        this.isLoading = false;
        return movieData.content;
      })
    ).subscribe(movieData => {
      this.MovieData = movieData;
      this.dataSource = new MatTableDataSource(this.MovieData);
    });
  }
}
