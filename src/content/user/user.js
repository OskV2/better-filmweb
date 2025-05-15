//  * /user/{user}

import { waitForElement } from '../../../utils/wait-for-element'
import {
  watchtimeRatedOverall,
  watchtimeRatedMovies,
  watchtimeRatedSeries,
  watchtimeWantToSeeOverall,
  watchtimeWantToSeeMovies,
  watchtimeWantToSeeSeries
} from '../../../utils/data';
import { watchtimeParser } from '../../../utils/watchtime-parser';

export const userPageRenderer = async () => {

  //  * If my element already exists return
  //  * This if statement will avoid rendering my element multiple times (this happened because filmweb is spaghetti coded)
  if (document.querySelector('.bf__title')) {
    return
  }

  const loadingContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__paragraph">Obliczanie watchtime'u</p>
  `

  // * Render elements on webpage for rated positions
  const div = document.createElement('div')
  div.innerHTML = loadingContent
  div.classList.add("bf__card");

  const elm = await waitForElement('div.page__content h2')  // * This will select h2 with text "Ostatnio ocenione"
  elm.prepend(div);

  const ratedMovies = await watchtimeRatedMovies()
  const ratedSeries = await watchtimeRatedSeries()
  const ratedOverall = await watchtimeRatedOverall()

  const loadedRatedContent = `
    <h2 class="bf__title">Better Filmweb - ocenione</h2>
    <p class="bf__paragraph">Watchtime filmów: <span class="bf__paragraph--yellow">${watchtimeParser(ratedOverall)}</span></p>
    <p class="bf__paragraph">Watchtime seriali: <span class="bf__paragraph--yellow">${watchtimeParser(ratedMovies)}</span></p>
    <p class="bf__paragraph">Watchtime sumaryczny: <span class="bf__paragraph--yellow">${watchtimeParser(ratedSeries)}</span></p>
  `
  div.innerHTML = loadedRatedContent

  // * Render elements on webpage for positions added to want2see
  const div2 = document.createElement('div')
  div2.innerHTML = loadingContent
  div2.classList.add("bf__card");

  const elm2 = await waitForElement('#app > section:nth-child(4) > div:nth-child(1) > h2')  // * This will select h2 with text "Chcę zobaczyć"
  console.log(elm2)
  elm2.prepend(div2)

  const w2sMovies = await watchtimeWantToSeeMovies()
  const w2sSeries = await watchtimeWantToSeeSeries()
  const w2sOverall = await watchtimeWantToSeeOverall()

  const loadedW2sContent = `
    <h2 class="bf__title">Better Filmweb - dodane do "Chcę zobaczyć"</h2>
    <p class="bf__paragraph">Watchtime filmów: <span class="bf__paragraph--yellow">${watchtimeParser(w2sMovies)}</span></p>
    <p class="bf__paragraph">Watchtime seriali: <span class="bf__paragraph--yellow">${watchtimeParser(w2sSeries)}</span></p>
    <p class="bf__paragraph">Watchtime sumaryczny: <span class="bf__paragraph--yellow">${watchtimeParser(w2sOverall)}</span></p>
  `
  div2.innerHTML = loadedW2sContent
}

