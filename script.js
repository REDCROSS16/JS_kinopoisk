const searchForm = document.querySelector('#search-form');

const movie = document.querySelector("#movies");

function apiSearch (event) {
    event.preventDefault();
    
    const searchText = document.querySelector('.form-control').value,
    server = "https://api.themoviedb.org/3/search/multi?api_key=1a18bd048bf1d7a8d6cef1422ccb1345&language=ru&query=" + searchText;
    
    requestAPI('GET', server);
    
}

searchForm.addEventListener('submit', apiSearch);

function requestAPI (method, url) {
    
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();
    
request.addEventListener ('readystatechange', () => {
if (request.readyState !==4) return;

//проверка статусу ( пока непонятно)
if (request.status !== 200) {
    console.log('error' + " " + request.status);
    return;
}
//Распарсили на объекты
const output = JSON.parse(request.responseText);

let inner = '';

output.results.forEach(function(item, i, array){
    let nameItem = item.name || item.title;
    console.log(output.results);
    let firstDate = item.release_date;
    inner = inner + '<div class="col-12">' + nameItem +  ' - ' + 'Дата релиза:' + ' ' + firstDate  + '</div>';
}); 

movie.innerHTML = inner;

});

}
