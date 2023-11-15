const API_KEY = "66e2278a2f72441e816648f8f672fc16";
const url = "https://newsapi.org/v2/everything?q=";

// Define custom categories and their associated queries
const categories = {
    ipl: "IPL",
    finance: "Finance",
    health: "Health",
    movies: "Movies",
    trending: "Trending",
    politics: "Politics",
};


window.addEventListener("load", () => {
    fetchNews(); // Fetch news on page load
    setInterval(fetchNews, 60000); // Fetch news every minute (adjust the interval as needed)
});

async function fetchNews() {
    try {
        const response = await fetch(`${NEWS_API_URL}?country=us&apiKey=${API_KEY}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return; // Skip articles without images
        const cardClone = createNewsCard(article);
        cardsContainer.appendChild(cardClone);
    });
}

function createNewsCard(article) {
    // Create a news card element here, similar to your template
    // Example:
    const card = document.createElement("div");
    card.classList.add("card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const newsImage = document.createElement("img");
    newsImage.src = article.urlToImage;
    // Add the image to the cardHeader or another appropriate element

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    // Create and append other elements like title, description, source, etc.

    cardHeader.appendChild(newsImage);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);

    return card;
}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    const query = categories[id]; // Use the custom category query
    if (!query) return;

    fetchNews(query);

    // Handle active class for navigation items
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
