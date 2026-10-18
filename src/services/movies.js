import { getMovieDetails } from '../api/movie-details.js'

/**
 * Calculates the total duration of the specified movies in minutes.
 * Returns the accumulated duration if an error interrupts the calculation.
 *
 * @param {Array<number|string>} IDs - Filmweb movie IDs.
 * @returns {Promise<number>} Total duration in minutes.
 */
export async function getMoviesWatchtime(IDs) {
  let watchtime = 0;

  for (const id of IDs) {
    const response = await getMovieDetails(id);
    if (response.duration) watchtime = watchtime + response.duration;
  }

  return watchtime;
}
