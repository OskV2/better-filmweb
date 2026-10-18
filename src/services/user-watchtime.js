import { fetchTitleIds } from "../api/list-of-ids.js"
import { getMoviesWatchtime } from "./movies.js"
import { getSeriesWatchtime, loadSeriesData } from "./series.js"
import { getCachedData, setCachedData } from "../storage/cache.js"

//  Constants
const SESSION_COOKIE = document.cookie
const CATEGORY_RATED = 'vote'
const CATEGORY_WANT2SEE = 'want2see'
const TYPE_MOVIE = 'film'
const TYPE_SERIES = 'serial'

/**
 * Watchtime of rated movies
 */
export const watchtimeRatedMovies = async () => {
    const cached = await getCachedData("WATCHTIME_RATED_MOVIES");
    if (cached !== null) return cached

    const IDs = await fetchTitleIds(SESSION_COOKIE, CATEGORY_RATED, TYPE_MOVIE);
    const watchtime = await getMoviesWatchtime(IDs)

    await setCachedData("WATCHTIME_RATED_MOVIES", watchtime)
    return watchtime
}

/**
 * Watchtime of rated series
 */
export const watchtimeRatedSeries = async () => {
    const cached = await getCachedData("WATCHTIME_RATED_SERIES");
    if (cached !== null) return cached

    const ids = await fetchTitleIds(SESSION_COOKIE, CATEGORY_RATED, TYPE_SERIES);
    const seriesData = await loadSeriesData(ids)
    const watchtime = getSeriesWatchtime(seriesData)

    await setCachedData("WATCHTIME_RATED_SERIES", watchtime)
    
    return watchtime
}

/**
 * Watchtime of all rated movies and series combined
 */
export const watchtimeRatedOverall = async () => {
    const moviesWatchtime = await watchtimeRatedMovies()
    const seriesWatchtime = await watchtimeRatedSeries()
    return moviesWatchtime + seriesWatchtime
}

/**
 * Watchtime of all movies added to "want2see" tab
 */
export const watchtimeWantToSeeMovies = async () => {
    const cached = await getCachedData("WATCHTIME_WANT2SEE_MOVIES");
    if (cached !== null) {
      return cached;
    }

    const IDs = await fetchTitleIds(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_MOVIE);
    const watchtime = await getMoviesWatchtime(IDs)

    await setCachedData("WATCHTIME_WANT2SEE_MOVIES", watchtime)
    return watchtime
}

/**
 * Watchtime of all series added to "want2see" tab
 */
export const watchtimeWantToSeeSeries = async () => {
    const cachedWatchtime = await getCachedData("WATCHTIME_WANT2SEE_SERIES");
    if (cachedWatchtime !== null) {
      return cachedWatchtime
    }

    const ids = await fetchTitleIds(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_SERIES);
    const seriesData = await loadSeriesData(ids)
    const watchtime = getSeriesWatchtime(seriesData)
  
    await setCachedData("WATCHTIME_WANT2SEE_SERIES", watchtime)

    console.log(watchtime)

    return watchtime
}

/** 
 * Watchtime of all movies and series added to "want2see" tab
 */
export const watchtimeWantToSeeOverall = async () => {
    const moviesWatchtime = await watchtimeWantToSeeMovies()
    const seriesWatchtime = await watchtimeWantToSeeSeries()
    return moviesWatchtime + seriesWatchtime
}
