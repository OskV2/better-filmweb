//  * /user/{user}

import { waitForElement } from '../../../utils/wait-for-element'
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
} from '../../../utils/data';
import { watchtimeParser } from '../../../utils/watchtime-parser';

export const userPageRenderer = async () => {

  //  * If my element already exists return
  //  * This if statement will avoid rendering my element multiple times
  if (document.querySelector('.bf__title')) {
    return
  }

  let htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__paragraph">Obliczanie watchtime'u</p>
  `

  const div = document.createElement('div')
  div.innerHTML = htmlContent
  div.classList.add("bf__card");

  const elm = await waitForElement('div.page__content h2')
  console.log('Element is ready');
  console.log(elm)
  elm.prepend(div);

  const watchtimeOverall = await watchtimeRatedOverall()
  const watchtimeMovies = await watchtimeRatedMovies()
  const watchtimeSeries = await watchtimeRatedSeries()

  htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__paragraph">Watchtime filmów: <span class="bf__paragraph--yellow">${watchtimeParser(watchtimeMovies)}</span></p>
    <p class="bf__paragraph">Watchtime seriali: <span class="bf__paragraph--yellow">${watchtimeParser(watchtimeSeries)}</span></p>
    <p class="bf__paragraph">Watchtime sumaryczny: <span class="bf__paragraph--yellow">${watchtimeParser(watchtimeOverall)}</span></p>
  `
  div.innerHTML = htmlContent
}

