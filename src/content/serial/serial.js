import { watchtimeSingleSeries } from "../../../utils/data"
import { waitForElement } from "../../../utils/wait-for-element"
import { watchtimeParser } from "../../../utils/watchtime-parser"

// * Pass url into function to get the ID of the series that needs to be calculated
export const singleSeriesPageRenderer = async (url) => {

  console.log('singleSeriesPageRenderer function is fired')

  // * If my element already exists return
  // * This if statement will avoid rendering my element multiple times (this happened because filmweb is spaghetti coded)
  if (document.querySelector('.bf__title')) {
    return
  }

  const p = document.createElement('p');
  p.classList.add('bf__single-series-watchtime');
  p.innerHTML = `Długość: <span class="bf__single-series-watchtime--yellow">Obliczanie</span>`

  const elm = await waitForElement('div.filmPosterSection__poster')
  elm.append(p);

  // * Extract the ID from the url passed into function
  const match = url.match(/-(\d+)$/);
  const id = match[1];
  console.log("Extracted ID:", id);
  
  // * Calculate watchtime using prepared function
  const singleSeriesWatchtime = await watchtimeSingleSeries(id)
  console.log(singleSeriesWatchtime)


  p.innerHTML = `Długość: <span class="bf__single-series-watchtime--yellow">${watchtimeParser(singleSeriesWatchtime)}</span>`
}