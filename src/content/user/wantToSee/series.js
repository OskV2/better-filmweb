import { waitForElement, waitForElements } from '../../../../utils/wait-for-element'
import { watchtimeWantToSeeSeries } from '../../../../utils/data';
import { watchtimeParser } from '../../../../utils/watchtime-parser';

export const wantToSeeSeriesPageRenderer = async () => {
  console.log('wantToSeeSeriesPageRenderer function fired')
  let htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__paragraph">Obliczanie watchtime'u</p>
  `

  const elm = await waitForElement('div.page__content section')

  const [watchtimeSeries, seriesData] = await watchtimeWantToSeeSeries()

  // * Check if my content alredy exists in page (it can happen, because page does not always refresh when changing tabs - sometimes only content changes)
  // * If it exists just overwrite it
  // * If it doesnt exist create element and inject content into website
  const betterFilmweBox = document.querySelector('.bf__card')

  if (betterFilmweBox) {
    // * Change box content for the calculation time
    betterFilmweBox.innerHTML = htmlContent 
    
    htmlContent = `
      <h2 class="bf__title">Better Filmweb</h2>
      <p class="bf__paragraph">Watchtime seriali: <span class="bf__paragraph--yellow">${watchtimeParser(watchtimeSeries)}</span></p>
    `
    betterFilmweBox.innerHTML = htmlContent
  } else {
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    div.classList.add("bf__card");

    elm.prepend(div);

    htmlContent = `
      <h2 class="bf__title">Better Filmweb</h2>
      <p class="bf__paragraph">Watchtime seriali: <span class="bf__paragraph--yellow">${watchtimeParser(watchtimeSeries)}</span></p>
    `

    div.innerHTML = htmlContent
  }

    // * Code below will display watchtime for each series in want2see tab - for this i can finally use seriesData extracted from 
    // * All series saved in "Want2See" tab
    // * It's an array of nodes
    const savedSeriesNodes = await waitForElements('#app > div.sc-krNlru.sc-eBfVOF.iqUtSB.jSTDPa > section > div.sc-krNlru.sc-iKqsjz.elseMQ.eKHIhI > div');
    setTimeout(async () => {
      savedSeriesNodes.forEach((node, index) => {
        // * Find first <a> tag to get ID of series
        const anchor = node.querySelector('a[href^="/serial/"]');
        if (!anchor) return;

        // * Extract the ID from the href using regex
        const href = anchor.getAttribute('href');
        const match = href.match(/-(\d+)$/);
        if (!match) return;

        const id = +match[1];

        const matchedSeries = seriesData.find(series => series.seriesID === id);
        if (!matchedSeries) return;

        const singleSeriesWatchtime = matchedSeries.avgEpisodeDuration * matchedSeries.numberOfEpisodes;

        const p = document.createElement('p');
        p.classList.add('bf__series-watchtime');
        p.innerHTML = `Długość: <span class="bf__series-watchtime--yellow">${watchtimeParser(singleSeriesWatchtime)}</span>`;

        node.prepend(p)
      });
    }, 500);
}