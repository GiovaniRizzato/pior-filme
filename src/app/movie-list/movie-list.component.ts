import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';
import { Movie } from '../movie-service/movie-models';

@Component({
  selector: 'movie-list-component',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'year', 'studios', 'producers', 'winner'];
  dataSource = new MatTableDataSource<Movie>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((movies) => {
      this.setMovies(movies);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setMovies(movies: Movie[]) {
    this.dataSource.data = movies;
  }
}
