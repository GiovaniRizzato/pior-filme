import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinAndMaxWinIntervalForProducers, Movie, StudioWinningCountList, YearWinningCountList } from './movie-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  // Método para obter a lista de todos os filmes
  getAllMovies(page: number, size: number, isWinner: boolean, year: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}?page=${page}&size=${size}&winner=${isWinner}&year=${year}`);
  }

  // Método para obter os anos com mais de um vencedor
  getYearsWithMultipleWinners(): Observable<YearWinningCountList> {
    return this.http.get<YearWinningCountList>(`${environment.apiUrl}?projection=years-with-multiple-winners`);
  }

  // Método para obter os estúdios com contagem de vitórias
  getStudiosWithWinCount(): Observable<StudioWinningCountList> {
    return this.http.get<StudioWinningCountList>(`${environment.apiUrl}?projection=studios-with-win-count`);
  }

  // Método para obter os intervalos de vitórias dos produtores
  getWinIntervalForProducers(): Observable<MinAndMaxWinIntervalForProducers> {
    return this.http.get<MinAndMaxWinIntervalForProducers>(`${environment.apiUrl}?projection=max-min-win-interval-for-producers`);
  }

  // Método para obter os vencedores de determinado ano
  getWinnersByYear(isWinner: boolean, year: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiUrl}?winner=${isWinner}&year=${year}`);
  }
}
