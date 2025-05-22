const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const tiwtterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;   
}

//Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false   ;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
  // check if author is unknown 
     if(!quote.author) {
    authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
   // Changing the font size dynamicly based on the text lenght
   if(quote.text.length > 80 ) {
    quoteText.classList.add('long-quote');
   }
    else {
    quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

//get quotes from api:
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try { 
    const Response = await fetch(apiUrl);
    apiQuotes = await Response.json();
    newQuote();
    } catch(error){
        // catch error here
    }
   
}

//tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener (makes the buttons work)
newQuoteBtn.addEventListener('click', newQuote);
tiwtterBtn.addEventListener('click', tweetQuote);

//rodando 4ever 
getQuotes();