//  Filmweb API is such a spaghetti, that this also works for series
export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`https://www.filmweb.pl/api/v1/film/${id}/preview`, {
      method: 'GET',
      headers: {
        'x-locale': 'pl_pl'
      }
    })
    data = await response.json()
    return data
  } catch (error) {
    console.error('Failed in movie details')
  }
}