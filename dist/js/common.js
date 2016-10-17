/*sliders*/
/*first*/
slidr.create('slidr-first', {
	transition: 'cube'
}).add('h', ['one', 'two', 'three', 'one']).start();
/*second*/
slidr.create('slidr-second', {
	transition: 'cube'
}).add('h', ['one', 'two', 'three', 'one']).start();
/*third*/
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
function createRequest(key){
    var apiKey = '3324605-cd4276f44c6c24381ca9603e8';
	var url = 'https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&pretty=true&per_page=7&q=' + key + '&r=' + Math.random();
    
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    // var xhr = new XHR();

    xhr.onreadystatechange = function( data ) {

        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            console.log(data);
            updImg(data);

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
    var key = document.getElementById('input_text').value;
    createRequest( key );
    document.getElementById('begin_masonry').scrollIntoView();
}

//event btn
document.getElementById('btn_search').addEventListener('click', function(){
    eventBtnSearch();
});

//event enter
document.getElementById('input_text').addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        eventBtnSearch();
    }
});

//create image tile
function updImg( data ) {
    var items = document.getElementsByClassName("grid__item-img");
    var titles = document.getElementsByClassName("grid__item-title");

    for ( var i = 0; i < data.hits.length; i++ ) {
        items[i].setAttribute( 'src', data.hits[i].webformatURL );
        titles[i].innerHTML = data.hits[i].tags;
    }
}

//default xhr
createRequest('travel friends');