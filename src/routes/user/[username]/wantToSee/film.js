import { watchtimeWantToSeeMovies } from '../../../../services/user-watchtime.js'
import { renderWatchtimeSummary } from '../../../../ui/render-list.js'

export const wantToSeeMoviesPageRenderer = async () => {
  try {
    const watchtime = await watchtimeWantToSeeMovies()
    await renderWatchtimeSummary(watchtime, 'Watchtime filmów')
  } catch (err) {
    console.error(`Error in wantToSeeMoviesPageRenderer: ${err.message}`);
  }
}
