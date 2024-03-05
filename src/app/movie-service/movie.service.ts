import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinAndMaxWinIntervalForProducers, Movie, StudioWinningCountList, YearWinningCountList } from './movie-models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //private apiUrl = 'https://tools.texoit.com/backend-java/api/movies';
  private apiUrl = 'http://localhost:3100/api/movies';

  constructor(private http: HttpClient) { }

  // Método para obter a lista de todos os filmes
  getAllMovies(page: number, size: number, isWinner: boolean, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}&winner=${isWinner}&year=${year}`);
  }

  // Método para obter os anos com mais de um vencedor
  getYearsWithMultipleWinners(): Observable<YearWinningCountList> {
    return this.http.get<YearWinningCountList>(`${this.apiUrl}?projection=years-with-multiple-winners`);
  }

  // Método para obter os estúdios com contagem de vitórias
  getStudiosWithWinCount(): Observable<StudioWinningCountList> {
    return this.http.get<StudioWinningCountList>(`${this.apiUrl}?projection=studios-with-win-count`);
  }

  // Método para obter os intervalos de vitórias dos produtores
  getWinIntervalForProducers(): Observable<MinAndMaxWinIntervalForProducers> {
    return this.http.get<MinAndMaxWinIntervalForProducers>(`${this.apiUrl}?projection=max-min-win-interval-for-producers`);
  }

  // Método para obter os vencedores de determinado ano
  getWinnersByYear(isWinner: boolean, year: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}?winner=${isWinner}&year=${year}`);
  }
}
