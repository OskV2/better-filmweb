/**
 * Fetches movie or series IDs from the signed-in user's ratings or want-to-see list.
 * Requires an active Filmweb session. Stops when a page contains fewer than 100 items.
 *
 * @param {string} cookie - Session cookies passed to the API requests.
 * @param {'vote'|'want2see'} mediaCategory - User list to fetch.
 * @param {'film'|'serial'} mediaType - Type of titles to fetch.
 * @returns {Promise<number[]>} IDs collected from the list.
 */
export const fetchTitleIds = async (cookie, mediaCategory, mediaType) => {
  const ids = []
  let page = 1

  while (true) {
    let url = ''
    if (mediaCategory === 'vote')     url = `https://www.filmweb.pl/api/v1/logged/${mediaCategory}/title/${mediaType}?page=${page}`
    if (mediaCategory === 'want2see') url = `https://www.filmweb.pl/api/v1/logged/${mediaCategory}/${mediaType}?page=${page}`

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Cookie': cookie }
    });

    if (!response.ok) {
      const error = new Error(`Filmweb request failed: HTTP ${response.status}`)
      error.status = response.status
      throw error
    }

    const data = await response.json();

    for (const movie of data) {
      ids.push(movie.entity)
    }

    if (data.length < 100) break
    page++
  }

  return ids
}