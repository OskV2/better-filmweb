/**
 * Fetches preview details for a movie or series from Filmweb.
 *
 * @param {number|string} id - Filmweb movie or series ID.
 * @returns {Promise<Object|undefined>} Preview details, or undefined if fetching fails.
 */
export const getMovieDetails = async (id) => {
    const response = await fetch(`https://www.filmweb.pl/api/v1/film/${id}/preview`, {
      method: 'GET',
      headers: { 'x-locale': 'pl_pl' }
    })

    if (!response.ok) {
      const error = new Error(`Filmweb request failed: HTTP ${response.status}`)
      error.status = response.status
      throw error
    }

    return await response.json()
}
