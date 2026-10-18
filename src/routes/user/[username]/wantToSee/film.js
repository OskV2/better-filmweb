import { watchtimeWantToSeeMovies } from '../../../../services/user-watchtime.js'
import { renderWatchtimeSummary } from '../../../../ui/render-list.js'

export const wantToSeeMoviesPageRenderer = async () => {
  const watchtime = await watchtimeWantToSeeMovies()
  await renderWatchtimeSummary(watchtime, 'Watchtime filmów')
}
