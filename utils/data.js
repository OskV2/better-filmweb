import { getListOfIDs } from "../api/list-of-ids"
import { getOverallWatchtime, getMoviesWatchtime, getSeriesWatchtime } from "../api/watchtime"

//  * Constants
const SESSION_COOKIE = document.cookie
const CATEGORY_RATED = 'vote'
const CATEGORY_WANT2SEE = 'want2see'
const TYPE_MOVIE = 'film'
const TYPE_SERIES = 'serial'

//  Watchtime of all rated movies and series combined
export const watchtimeRatedOverall = async () => {
  try {
    const movieIDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_RATED, TYPE_MOVIE);
    const seriesIDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_RATED, TYPE_SERIES);
    const watchtime = await getOverallWatchtime(movieIDs, seriesIDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes (watchtime rated overall)');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of rated movies
export const watchtimeRatedMovies = async () => {
  try {
    const IDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_RATED, TYPE_MOVIE);
    const watchtime = await getMoviesWatchtime(IDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of rated series
export const watchtimeRatedSeries = async () => {
  try {
    const IDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_RATED, TYPE_SERIES);
    const watchtime = await getSeriesWatchtime(IDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of all movies and series added to "want2see" tab
export const watchtimeWantToSeeOverall = async () => {
  try {
    const movieIDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_MOVIE);
    const seriesIDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_SERIES);
    const watchtime = await getOverallWatchtime(movieIDs, seriesIDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of all movies added to "want2see" tab
export const watchtimeWantToSeeMovies = async () => {
  try {
    const IDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_MOVIE);
    const watchtime = await getMoviesWatchtime(IDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of all series added to "want2see" tab
export const watchtimeWantToSeeSeries = async () => {
  try {
    const IDs = await getListOfIDs(SESSION_COOKIE, CATEGORY_WANT2SEE, TYPE_SERIES);
    const watchtime = await getSeriesWatchtime(IDs)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}

//  Watchtime of series specified by the id parameter
export const watchtimeSingleSeries = async (id) => {  
  try {
    const watchtime = await getSeriesWatchtime(id)
    return watchtime
  } catch (error) {
    console.error('Failed in routes');
    throw new Error('Failed to get data!')
  }
}