console.log('Content script loaded for:', window.location.href)

// Simple DOM manipulation to verify it's working
const div = document.createElement('div')
div.style.position = 'fixed'
div.style.bottom = '20px'
div.style.right = '20px'
div.style.backgroundColor = 'red'
div.style.color = 'white'
div.style.padding = '10px'
div.style.zIndex = '9999'
div.textContent = 'Better Filmweb Extension is working! And ive made a change'
document.body.appendChild(div)

// If you want to use React, you'll need to import your ContentApp here
// and mount it to a DOM element