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
/*init Isotope*/
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid__item',
  columnWidth: '.grid__sizer',
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  /*layout Masonry after each image loads*/
  msnry.layout();
});