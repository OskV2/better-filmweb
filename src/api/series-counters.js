/**
 * Fetches series counters, including seasons, episodes, awards, and nominations.
 * Episode counts may be inaccurate for series with multiple seasons.
 *
 * @param {number|string} id - Filmweb series ID.
 * @returns {Promise<Object>} Series counters returned by Filmweb.
 */
export const getSeriesCounters = async (id) => {
    const response = await fetch(`https://www.filmweb.pl/api/v1/film/${id}/counters`)

    if (!response.ok) {
      const error = new Error(`Filmweb request failed: HTTP ${response.status}`)
      error.status = response.status
      throw error
    }

    return response.json()
}