import { watchtimeRatedMovies } from '../../../../services/user-watchtime.js'
import { renderWatchtimeSummary } from '../../../../ui/render-list.js'

export const ratedMoviesPageRenderer = async () => {
  const watchtime = await watchtimeRatedMovies()
  await renderWatchtimeSummary(watchtime, 'Watchtime filmów')
}
