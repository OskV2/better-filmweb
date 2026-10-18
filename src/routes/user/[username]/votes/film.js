import { watchtimeRatedMovies } from '../../../../services/user-watchtime.js'
import { renderWatchtimeSummary } from '../../../../ui/render-list.js'

export const ratedMoviesPageRenderer = async () => {
  try {
    const watchtime = await watchtimeRatedMovies()
    await renderWatchtimeSummary(watchtime, 'Watchtime filmów')
  } catch (err) {
    console.error(`Error in ratedMoviesPageRenderer: ${err.message}` )
  }
}
