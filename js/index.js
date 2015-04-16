var opts = {
  maxDimensions         : 3,
  dimensionColumnCount  : 3,
  dimensionRowCount     : 3,
  shapes                : ['a', 'b', 'c'],
  shapesPerDimension    : 1
};



// set up the stage and css so all dimensions are squared up
(function(){
  var dimensionWidthPercent = 100/(1 + opts.maxDimensions);
  $('#reality').width(dimensionWidthPercent + '%');
  $('#dimensions').width(100 - dimensionWidthPercent + '%');
  opts.cellHeight = ($('#dimensions').width()/opts.maxDimensions)/opts.dimensionColumnCount;
})();



// make the universe
var universe = new Universe({ maxDimensions : opts.maxDimensions });

// make my reality
universe.reality = new Reality({
  columnCount : opts.dimensionColumnCount,
  rowCount    : opts.dimensionRowCount,
  shapes      : opts.shapes,
  cellHeight  : opts.cellHeight
});



// create the dimensions in the universe
var addDimension = function(){
  return universe.addDimension(new Dimension({
    columnCount : opts.dimensionColumnCount,
    rowCount    : opts.dimensionRowCount,
    shapes      : opts.shapes,
    shapeCount  : opts.shapesPerDimension,
    width       : 100/opts.maxDimensions + '%',
    cellHeight  : opts.cellHeight
  }));
};



// load the initial dimensions to start the game
for(var i=0; i<universe.maxDimensions; i++){ addDimension(); }



// whenver a new dimension is created, check to ensure the first dimension
// matches my reality
var $score = $('#score');
var score = 0;
var realityCheck = function(dimension){
  if(universe.reality.looksLike(dimension)) score++;
  else score--;

  $score.html(score);
};

universe.draw();



// create new dimensions at an increasing rate
createDimension(3000, createDimension);
function createDimension(timeout, next){
  setTimeout(function(){
    realityCheck(addDimension());
    universe.draw();

    var newTimeout = timeout - 25;
    if(newTimeout < 500) newTimeout = 500;
    next(newTimeout, createDimension);
  }, timeout);
}
