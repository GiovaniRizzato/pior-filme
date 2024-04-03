import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinAndMaxWinIntervalForProducers, Movie, MoviesPageable, StudioWinningCountList, YearWinningCountList } from './movie-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  // Método para obter a lista de todos os filmes
  getAllMovies(pageIndex: number, pageSize: number, isWinner?: boolean, year?: number, ): Observable<MoviesPageable> {
    let params = new HttpParams()
      .set('page', pageIndex)
      .set('size', pageSize);
    if(isWinner) params = params.set('winner', isWinner);
    if(year) params = params.set('year', year);

    return this.http.get<MoviesPageable>(environment.apiUrl, {params});
  }

  // Método para obter os anos com mais de um vencedor
  getYearsWithMultipleWinners(): Observable<YearWinningCountList> {
    return this.http.get<YearWinningCountList>(environment.apiUrl, {
      params: new HttpParams().set('projection', 'years-with-multiple-winners')
    });
  }

  // Método para obter os estúdios com contagem de vitórias
  getStudiosWithWinCount(): Observable<StudioWinningCountList> {
    return this.http.get<StudioWinningCountList>(environment.apiUrl, {
      params: new HttpParams().set('projection', 'studios-with-win-count')
    });
  }

  // Método para obter os intervalos de vitórias dos produtores
  getWinIntervalForProducers(): Observable<MinAndMaxWinIntervalForProducers> {
    return this.http.get<MinAndMaxWinIntervalForProducers>(environment.apiUrl, {
      params: new HttpParams().set('projection', 'max-min-win-interval-for-producers')
    });
  }

  // Método para obter os vencedores de determinado ano
  getWinnersByYear(isWinner: boolean, year: number): Observable<Movie> {
    return this.http.get<Movie>(environment.apiUrl, {
      params: new HttpParams()
        .set('winner', isWinner)
        .set('year', year)
    });
  }
}
