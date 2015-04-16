var Universe = function(opts){
  for(var key in opts){ this[key] = opts[key]; }
  this.dimensions = [];

  return this;
};



// the universe is limited to a predetermined number of
// dimensions. If there's no room for another dimension, the
// last one has to leave
Universe.prototype.addDimension = function(dimension){
  var lostDimension = null;

  if(this.dimensions.length >= this.maxDimensions)
    lostDimension = this.dimensions.shift();

  this.dimensions.push(dimension);

  return lostDimension;
};



// draw all dimensions to the screen
Universe.prototype.draw = function(){
  var html = '';
  this.dimensions.forEach(function(dimension){
    html += dimension.html;
  });

  $('#dimensions').html(html);
};
