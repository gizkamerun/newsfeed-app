
const APIkey = 'b714f12698014cf4aac6cd930ab5ffae';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'techcrunch';
var $newfeed = $('#newsfeed');
var $bookfeed = $('#booksfeed');


var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        //'source=techcrunch&' +
        'apiKey=b714f12698014cf4aac6cd930ab5ffae';

var itbooksUrl = 'http://it-ebooks-api.info/v1/search/progressive%20app'

var req = new Request(url);
fetch(req)
.then(function(response) {
    //response.setHeader("Access-Control-Allow-Origin", "*");
    console.log(
        response.json()
    );
});

// init function
window.addEventListener('load', async e => {
    updateNews();
    updateBooks();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
       updateNews(e.target.value); 
    })

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('js/sw.js');
            console.log('SW registered!');
        } catch (error) {
            console.log('SW registration failed!');
        }
    }
});

 
$( document ).ready(function() {
   // updateNews();
   //  updateSources();
    sourceSelector.value = defaultSource;
    
}); 

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');


}

async function updateNews(newssource = defaultSource){
    const res = await fetch('https://newsapi.org/v1/articles?' +
    'country=us&' +
    `source=${newssource}&` +
    'apiKey=b714f12698014cf4aac6cd930ab5ffae');
    const json = await res.json();

    //main.innerHTML = json.articles.map(createArticle).join('\n');
    $newfeed.find('.row').html(json.articles.map(createArticle));
}

async function updateBooks(){
    const res = await fetch(itbooksUrl);
    const json = await res.json();

    //main.innerHTML = json.articles.map(createArticle).join('\n');
    $bookfeed.find('.row').html(json.Books.map(createBook));
}

function createArticle(article){
    return tmpl =  `
    <div class="col-xs"> 
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${article.urlToImage}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text">${article.description}</p>
        <a href="${article.url}" class="btn btn-primary">read more</a>
        </div>
    </div>
    </div>
    
    `;
    // return  `<div class="col-sm-6 col-md-4"> 
    //     <div class="thumbnail"> 
    //         <img alt="100%x200" data-src="js/holder.js/100%x200" src="${article.urlToImage}"> 
    //         <div class="caption"> <h3>${article.title}</h3> 
    //         <p>${article.description}</p> 
    //         <p><a href="${article.url}" class="btn btn-primary" role="button">more ...</a></p> 
    //             </div> 
    //         </div> 
    // </div>` ;
}

function createBook(book){    
    
    return  `<div class="col-sm-6 col-md-4"> 
        <div class="thumbnail"> 
            <img alt="100%x200" data-src="js/holder.js/100%x200" src="${book.Image}"> 
            <div class="caption"> <h3>${book.Title}</h3> 
            <small>${book.SubTitle}</small> 
            <p>${book.Description}</p> 
            <p>
            <a href="http://it-ebooks.info/book/${book.ID}" class="btn btn-primary" role="button">more ...</a>
            <a href="${book.Download}" class="btn btn-secondary" role="button">Download</a>
            </p> 
                </div> 
            </div> 
    </div>` ;
}

