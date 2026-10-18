
/**
 * Fetches the number of movies or series in the signed-in user's ratings or want-to-see list.
 * Requires an active Filmweb session.
 *
 * @param {string} cookie - Session cookies passed to the API request.
 * @param {'vote'|'want2see'} mediaCategory - User list to count.
 * @param {'film'|'serial'} mediaType - Type of titles to count.
 * @returns {Promise<number|undefined>} Item count, or undefined if the request fails.
 */
const fetchCount = async (cookie, mediaCategory, mediaType) => {
  const url = `https://www.filmweb.pl/api/v1/logged/${mediaCategory}/${mediaType}/count`

  const response = await fetch(url, { headers: { Cookie: cookie } })
  
  if (!response.ok) {
    const error = new Error(`Filmweb request failed: HTTP ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const getRatedMovieCount = (cookie) => fetchCount(cookie, 'vote', 'film')
export const getRatedSeriesCount = (cookie) => fetchCount(cookie, 'vote', 'serial')
export const getWantToSeeMovieCount = (cookie) => fetchCount(cookie, 'want2see', 'film')
export const getWantToSeeSeriesCount = (cookie) => fetchCount(cookie, 'want2see', 'serial')