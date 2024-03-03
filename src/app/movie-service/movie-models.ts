export interface YearWinningCountList {
  years: YearWinningCount[]
}

export interface YearWinningCount {
  year: number,
  winnerCount: number
}

export interface StudioWinningCountList {
  studios: StudioWinningCount[]
}

export interface StudioWinningCount {
  name: string,
  winCount: number
}

export interface MinAndMaxWinIntervalForProducers {
  min: WinIntervalForProducers,
  max: WinIntervalForProducers
}

export interface WinIntervalForProducers {
  producer: string,
  interval: number,
  previousWin: number,
  followingWin: number
}

export interface Movie {
  id: string,
  year: number,
  tittle: string,
  studio: string[],
  producers: string[],
  winner: boolean
}