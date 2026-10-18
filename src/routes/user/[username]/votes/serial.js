import { watchtimeRatedSeries } from '../../../../services/user-watchtime.js';
import { renderWatchtimeSummary } from '../../../../ui/render-list.js';

export const ratedSeriesPageRenderer = async () => {
  try {
    const watchtime = await watchtimeRatedSeries();
    await renderWatchtimeSummary(watchtime, 'Watchtime seriali');
  } catch (err) {
    console.error(`Error in ratedSeriesPageRenderer: ${err.message}`);
  }
};
