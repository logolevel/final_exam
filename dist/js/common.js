/*sliders*/
//first
slidr.create('slidr-first', {
	transition: 'cube'
}).add('h', ['one', 'two', 'three', 'one']).start();
//second
slidr.create('slidr-second', {
	transition: 'cube'
}).add('h', ['one', 'two', 'three', 'one']).start();
//third
slidr.create('slidr-third', {
	transition: 'cube'
}).add('h', ['one', 'two', 'three', 'one']).start();

/*masonry*/
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid__item',
  columnWidth: '.grid__sizer',
  percentPosition: true
});

/*XMLHttpRequest*/

function randomizer() {
    return words["tag"][Math.round(Math.random()*10)];
}
var word = randomizer();

//main function for ajax request
function createRequest( word ){
    var apiKey = '3324605-cd4276f44c6c24381ca9603e8';
	var url = 'https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&pretty=true&per_page=7&q=' + word + '&r=' + Math.random();
//for IE8
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
//ajax request
    xhr.onreadystatechange = function( data ) {

        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            updImg(data);
//imageLoaded for masonry
            imagesLoaded( grid ).on( 'progress', function() {
  					     msnry.layout();
						});
        }
    };
		xhr.open('GET', url, true);
		xhr.send();
}

//eventBtnSearch
function eventBtnSearch() {
    var word = document.getElementById('input_text').value;
    createRequest( word );
    document.getElementById('begin_masonry').scrollIntoView();
}
//event for click btn
var btnSearch = document.getElementById('btn_search');

if (btnSearch.addEventListener) {
    btnSearch.addEventListener("click", function(){
    eventBtnSearch();
});
}//IE8
else {
    btnSearch.attachEvent("onclick", function(){
    eventBtnSearch();
});
}

//event for enter button
var inputText = document.getElementById('input_text');

if (inputText.addEventListener) {
    inputText.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        eventBtnSearch();
    }
});
}
//IE8
else {
    inputText.attachEvent("onkeyup", function (e) {
    if (e.keyCode == 13) {
        eventBtnSearch();
    }
});
}

//create image tile
function updImg( data ) {
    var items = document.querySelectorAll(".grid__item-img");
    var titles = document.querySelectorAll(".grid__item-title");

    for ( var i = 0; i < data.hits.length; i++ ) {
        items[i].setAttribute( 'src', data.hits[i].webformatURL );
        titles[i].innerHTML = data.hits[i].tags;
    }
}

//default xhr
createRequest(word);