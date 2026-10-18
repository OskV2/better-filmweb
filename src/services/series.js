import { getSeriesCounters } from '../api/series-counters.js'
import { getMovieDetails } from '../api/movie-details.js'
import { getCachedData, setCachedData } from '../storage/cache.js'

/**
 * Fetches and caches episode counts and average episode durations for a series.
 * Cached data survives page reloads and expires after 15 minutes.
 *
 * @param {number|string} id - Filmweb series ID.
 * @returns {Promise<{id: number|string, numberOfEpisodes: number, avgEpisodeDuration: number}>} Series data.
 */
export async function getSeriesData(id) {
    const key = `series:${id}`
    const cached = await getCachedData(key)
    if (cached !== null) return cached

    const seriesCounters = await getSeriesCounters(id)
    const numberOfEpisodes = seriesCounters.episodes ?? 0

    const seriesDetails = await getMovieDetails(id)
    const avgEpisodeDuration = seriesDetails.duration ?? 0  //  Sometimes there is no average duration of episode, because for example serial is not released yet (example: Harry Potter)

    const series = {
      id,
      numberOfEpisodes,
      avgEpisodeDuration
    }

    await setCachedData(key, series)
    return series
}

/**
 * Loads data for the specified series using getSeriesData's cache.
 *
 * @param {Array<number|string>} ids - Filmweb series IDs.
 * @returns {Promise<Array<{id: number|string, numberOfEpisodes: number, avgEpisodeDuration: number}>>} Series data in the requested order.
 */
export async function loadSeriesData(ids) {
  const seriesData = []

  for (const id of ids) {
    const series = await getSeriesData(id)
    seriesData.push(series)
  }

  return seriesData
}

/**
 * Calculates the total duration of series from previously fetched data.
 *
 * @param {Array<{numberOfEpisodes: number, avgEpisodeDuration: number}>} seriesData - Series episode data.
 * @returns {number} Total duration in minutes.
 */
export function getSeriesWatchtime(seriesData) {
  let watchtime = 0

  for (const series of seriesData) {
    watchtime += series.numberOfEpisodes * series.avgEpisodeDuration
  }

  return watchtime
}

//  Watchtime of series specified by the id parameter
export const watchtimeSingleSeries = async (id) => {
  try {
    const series = await getSeriesData(id)
    return series.numberOfEpisodes * series.avgEpisodeDuration
  } catch (error) {
    console.error('Failed in routes');
  }
}
