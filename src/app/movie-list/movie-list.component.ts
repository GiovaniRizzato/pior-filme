import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from '../movie-service/movie.service';
import { Movie } from '../movie-service/movie-models';

@Component({
  selector: 'movie-list-component',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'year', 'studios', 'producers', 'winner'];
  dataSource = new MatTableDataSource<Movie>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly movieService: MovieService) {}

  ngOnInit() {
    this.resetMovies();
    this.dataSource.paginator = this.paginator;
  }

  resetMovies() {
    this.movieService.getAllMovies(this.paginator?.pageIndex ? this.paginator.pageIndex : 0, this.paginator?.pageSize ? this.paginator?.pageSize : 5, true, 2018).subscribe((movies) => {
      this.dataSource.data = movies.content;
    });
  }
}
