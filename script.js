const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote")
const loader = document.querySelector("#loader");

// Show loading function 
function showloading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading function 
function showQuote() {
    // if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
    // }
}


// Get Quote from API
async function getQuote() {
    // Before anything, show loading animation
    showloading();

    const proxyUrl = "https://ancient-crag-49665.herokuapp.com/" // To handle Cors errors
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        // response = await fetch(apiUrl);
        console.log(response);
        const data = await response.json();

        // if Author is blank, set authorText to "unknown"
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown"
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }

        //Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
            console.log(data.quoteText.length); // checking if it is working
        } else {
            quoteText.classList.remove("long-quote");
            console.log(data.quoteText.length); // checking if it is working
        }
        quoteText.innerText = data.quoteText;
        // console.log(data);

        // After quote is ready, show quote and hide loader Animation. 
        showQuote();

    }

    catch (error) {
        // handling error with special characters in quotes 
        //  because  are unable to parse 
        getQuote();
        console.log("whoops, no quote", error)
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}&hastags=motivation`
    window.open(twitterUrl, "_blank");
}


// Event listeners 
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load 
getQuote();
// loading();