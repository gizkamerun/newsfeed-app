
const APIkey = 'b714f12698014cf4aac6cd930ab5ffae';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'https://fr.allafrica.com/tools/headlines/rdf/cameroon/headlines.rdf'; //'techcrunch';
var $newfeed = $('#newsfeed');
var $bookfeed = $('#booksfeed');
// https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fallafrica.com%2Ftools%2Fheadlines%2Frdf%2Fcameroon%2Fheadlines.rdf&api_key=huaukeg55vyyubsldc3omqueahorzf84k6dqcnnz

var url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fallafrica.com%2Ftools%2Fheadlines%2Frdf%2Fcameroon%2Fheadlines.rdf&' +
              'api_key=huaukeg55vyyubsldc3omqueahorzf84k6dqcnnz';

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
    sourceSelector.value = defaultSource;
    updateNewsScopes();
    updateNews(defaultSource);
    updateBooks();
    //await updateSources();
    //updateNewsScopes();
    

    sourceSelector.addEventListener('change', e => {
       updateNews(encodeURI(e.target.value)); 
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

   

   
        $(".card-body img").css({
            width: '100%',
            height: 'auto'
        });

}); 

function updateNewsScopes(){
    var scopes  =[
        {"id":2, "url":"https://fr.allafrica.com/tools/headlines/rdf/cameroon/headlines.rdf", "name":"Cameroun - fr"},
        {"id":9, "url":"https://allafrica.com/tools/headlines/rdf/cameroon/headlines.rdf", "name":"Cameroon - en"},
        {"id":6, "url":"https://www.journalducameroun.com/feed/", "name":"Journal du Cameroun"},
        {"id":1, "url":"https://allafrica.com/tools/headlines/rdf/aid/headlines.rdf", "name":"Aid & Assistance"}, 
        {"id":10, "url":"https://fr.allafrica.com/tools/headlines/rdf/aid/headlines.rdf", "name":"Aide & Assistance / Coopération"},
        
        {"id":3, "url":"https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf", "name":"Latest"},
        {"id":4, "url":"https://allafrica.com/tools/headlines/rdf/africa/headlines.rdf", "name":"Africa"},
        {"id":5, "url":"http://africanarguments.org/feed/", "name":"African Arguments"},
        {"id":7, "url":"https://news.google.com/news/rss/search/section/q/giz+Cameroun%3Fgl=FR&hl=fr&ned=fr", "name":'GIZ Cameroun'},
        {"id":8, "url":"https%3A%2F%2Fnews.google.com%2Fnews%2Frss%2Fsearch%2Fsection%2Fq%2Fgiz%2BCameroun%3Fned%3Dfr%26gl%3DFR%26hl%3Dfr" , "name":'GIZ 2 Cameroun'},
    ];

    sourceSelector.innerHTML = scopes.map(src => `<option value="${src.url}">${src.name}</option>`).join('\n');

    $(".card-body img").css({
        width: '100%',
        height: 'auto'
    });
}

async function updateSources(){
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');

 
}

async function updateNews(newssource = defaultSource){
    //const res = await fetch('https://newsapi.org/v1/articles?' +
    //'country=us&' +
    //`source=${newssource}&` +
    //'apiKey=b714f12698014cf4aac6cd930ab5ffae');

    var url = encodeURI('https://api.rss2json.com/v1/api.json?' + 
    `rss_url=${(newssource)}&` +
    'api_key=huaukeg55vyyubsldc3omqueahorzf84k6dqcnnz' + 
    '&order_by=pubDate&count=20');

    const res = await fetch(url);

    const json = await res.json();

    //main.innerHTML = json.articles.map(createArticle).join('\n');
    //$newfeed.find('.row').html(json.articles.map(createArticle));
    $newfeed.find('.row').html(json.items.map(createArticle));
    
    $(".card-body img").css({
        width: '100%',
        height: 'auto'
    });
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
        <a href="${article.link}" >
            <img class="card-img-top img-responsive" src="${article.thumbnail}" alt="Card image cap">
            </a>
        <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p class="card-text  img-responsive">${article.description.substring(0,400)}</p>
        
        </div>
        <div class="card-footer">
        <a href="${article.link}" class="btn btn-primary">read more</a>
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
            <div class="caption"> <h3>"decodeURIComponent(escape(${book.Title}))"</h3> 
            <small>decodeURIComponent(escape(${book.SubTitle})) </small> 
            <p> decodeURIComponent(escape(${book.Description})) </p> 
            <p>
            <a href="http://it-ebooks.info/book/${book.ID}" class="btn btn-primary" role="button">more ...</a>
            <a href="${book.Download}" class="btn btn-secondary" role="button">Download</a>
            </p> 
                </div> 
            </div> 
    </div>` ;
}

