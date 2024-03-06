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
  min: WinIntervalForProducers[],
  max: WinIntervalForProducers[]
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
  title: string,
  studios: string[],
  producers: string[],
  winner: boolean
}

export interface MoviesPageable {
  content: Movie[],
  pageable?: {
    sort?: {
      sorted?: boolean,
      unsorted?:boolean
    },
    pageSize?: number,
    pageNumber?: number,
    offset?: number,
    paged?: boolean,
    unpaged?: boolean
  },
  totalElements?: number,
  last?: boolean,
  totalPages?: number,
  first?: boolean,
  sort?: {
    sorted?: boolean,
    unsorted?: boolean
  },
  number?: number,
  numberOfElements?: number,
  size?: number
}