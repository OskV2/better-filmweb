//  * /user/{user}

import { waitForElement } from '../../../utils/wait-for-element'
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
} from '../../../utils/data';

export const userPageRenderer = async () => {

  let htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__watchtime">Obliczanie watchtime'u</p>
  `

  const div = document.createElement('div')
  div.innerHTML = htmlContent
  div.classList.add("bf__card");

  const elm = waitForElement('div.page__content section:nth-of-type(2) div:first-of-type')
  console.log('Element is ready');
  elm.prepend(div);

  const watchtimeOverall = await watchtimeRatedOverall()
  const watchtimeMovies = await watchtimeRatedMovies()
  const watchtimeSeries = await watchtimeRatedSeries()

  htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__watchtime">Watchtime filmów: ${watchtimeMovies}</p>
    <p class="bf__watchtime">Watchtime seriali: ${watchtimeSeries}</p>
    <p class="bf__watchtime">Watchtime sumaryczny: ${watchtimeOverall}</p>
  `
  div.innerHTML = htmlContent
}