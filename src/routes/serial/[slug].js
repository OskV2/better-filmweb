import { watchtimeSingleSeries } from '../../services/series.js';
import { waitForElement } from '../../lib/wait-for-element.js';
import { renderDuration } from '../../ui/mount.jsx';

export const singleSeriesPageRenderer = async (url) => {
  try {
    if (document.querySelector('.bf__title')) return;

    const container = document.createElement('div');
    const target = await waitForElement('div.filmPosterSection__poster');
    target.append(container);

    renderDuration(container, { loading: true });
    const match = url.match(/-(\d+)$/);
    const minutes = await watchtimeSingleSeries(match[1]);
    renderDuration(container, { minutes });
  } catch (err) {
    console.error(`Error in singleSeriesPageRenderer: ${err.message}`);
  }
};
