import { waitForElement } from '../../../lib/wait-for-element.js';
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
  watchtimeWantToSeeOverall,
  watchtimeWantToSeeMovies,
  watchtimeWantToSeeSeries,
} from '../../../services/user-watchtime.js';
import { renderProfileCard } from '../../../ui/mount.jsx';

export const userPageRenderer = async () => {
  if (document.querySelector('.bf__title')) return;

  //  Summary - ratad
  const rated = document.createElement('div');
  rated.className = 'bf__card';
  
  const ratedTarget = await waitForElement('div.page__content h2');
  ratedTarget.prepend(rated);
  
  renderProfileCard(rated, { loading: true });

  const ratedMovies = await watchtimeRatedMovies();
  const ratedSeries = await watchtimeRatedSeries();
  const ratedOverall = await watchtimeRatedOverall();

  renderProfileCard(rated, {
    title: 'Better Filmweb - ocenione',
    moviesWatchtime: ratedMovies,
    seriesWatchtime: ratedSeries,
    overallWatchtime: ratedOverall,
  });

  //  Summary - want to see
  const wanted = document.createElement('div');
  wanted.className = 'bf__card';

  const wantedTarget = await waitForElement('#app > div.sc-fiCwlc.sc-fROACx.gZoKdo.cROfqp.gemiusReactions > div > section:nth-child(3) > div:nth-child(1) > h2');

  wantedTarget.prepend(wanted);
  renderProfileCard(wanted, { loading: true });

  const wantedMovies = await watchtimeWantToSeeMovies();
  const wantedSeries = await watchtimeWantToSeeSeries();
  const wantedOverall = await watchtimeWantToSeeOverall();

  renderProfileCard(wanted, {
    title: 'Better Filmweb - dodane do "Chcę zobaczyć"',
    moviesWatchtime: wantedMovies,
    seriesWatchtime: wantedSeries,
    overallWatchtime: wantedOverall,
  });
};
