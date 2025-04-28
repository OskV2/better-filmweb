import { getOverallWatchtime } from './user/user'

const currentUrl = window.location.href
console.log('Content script loaded for:', currentUrl)

//  * Routing
const HOME_PAGE = 'https://www.filmweb.pl/'
const USER_PROFILE_PAGE = currentUrl.match("^https:\/\/www\.filmweb\.pl\/user\/[^\/]+$");  //  Example:  
const USER_VOTES_MOVIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/film$");
const USER_VOTES_SERIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/votes\\/serial$");
const USER_WANT_TO_SEE_MOVIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/film$");
const USER_WANT_TO_SEE_SERIES_PAGE = currentUrl.match("^https:\\/\\/www\\.filmweb\\.pl\\/user\\/[^\\/]+#\\/wantToSee\\/serial$");


//  * 
const SESSION_COOKIE = document.cookie
const CATEGORY_RATED = 'vote'
const CATEGORY_WANT2SEE = 'want2see'
const TYPE_MOVIE = 'film'
const TYPE_SERIES = 'serial'

window.navigation.addEventListener("navigate", (event) => {
  console.log('location changed!');
  console.log(event)
})

if (USER_PROFILE_PAGE) {
  const userName = USER_PROFILE_PAGE.toString().split('/')
  console.log(`userName: ${userName}`)
  console.log(`You are currently at ${userName[4]} filmweb profile `)
  getOverallWatchtime()
  console.log('Does function work')
  console.log(SESSION_COOKIE)

  // Simple DOM manipulation to verify it's working
  const div = document.createElement('div')
  div.style.backgroundColor = 'red'
  div.style.color = 'white'
  div.style.padding = '10px'
  div.style.zIndex = '9999'
  div.textContent = 'Obliczanie watchTime\'u'
}

waitForElement('div.page__content h2')
  .then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    elm.appendChild(div);  // append the new element under the <a> tag
  })
  .then(() => {
    calculateWatchTime()
  })

function waitForElement(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              observer.disconnect();
              resolve(document.querySelector(selector));
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}