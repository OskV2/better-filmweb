import { waitForElement } from '../../../../utils/wait-for-element'
import { watchtimeParser } from '../../../../utils/watchtime-parser';

export const wantToSeeSeriesPageRenderer = async () => {
  let htmlContent = `
    <h2 class="bf__title">Better Filmweb</h2>
    <p class="bf__paragraph">Obliczanie watchtime'u</p>
  `

  const elm = await waitForElement('div.page__content section')

  // const watchtimeSeries = await watchtimeRatedMovies()
  //  DUMMY VARIABLES SO I DONT SPAM FILMWEB AT SERVER
  const watchtimeSeries = 420

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
}