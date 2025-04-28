
const currentUrl = window.location.href
console.log('Content script loaded for:', currentUrl)

const HOME_PAGE = 'https://www.filmweb.pl/'
const USER_PROFILE_PAGE = currentUrl.match("^https:\/\/www\.filmweb\.pl\/user\/[^\/]+$");  //  This regex will match 
// const RECENTLY_RATED = document.querySelector("div.page__content")

// const h2 = RECENTLY_RATED.querySelector('h2');

// console.log(USER_PROFILE_PAGE)

if (USER_PROFILE_PAGE) {
  const userName = USER_PROFILE_PAGE.toString().split('/')
  console.log(userName)
  console.log(`You are currently at ${userName[4]} filmweb profile `)
}

// Simple DOM manipulation to verify it's working
const div = document.createElement('div')
// div.style.position = 'fixed'
// div.style.bottom = '20px'
// div.style.right = '20px'
div.style.backgroundColor = 'red'
div.style.color = 'white'
div.style.padding = '10px'
div.style.zIndex = '9999'
div.textContent = 'Obliczanie watchTime\'u'

// document.body.appendChild(div)

// If you want to use React, you'll need to import your ContentApp here
// and mount it to a DOM element


waitForElement('div.page__content h2')
  .then((elm) => {
    console.log('Element is ready');
    console.log(elm);
    elm.appendChild(div);  // append the new element under the <a> tag
  })
  .then(() => {
    calculateWatchTime()
  })

// const displayWatchTime = async () => {
//   await waitForElement('div.page__content h2')
//   let watchTime = await calculateWatchTime();

// }

const calculateWatchTime = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      return 10;
    }, 2000);
  });
}

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