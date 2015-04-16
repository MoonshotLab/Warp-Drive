var Universe = function(opts){
  for(var key in opts){ this[key] = opts[key]; }
  this.dimensions = [];
  this.$dimensions = $('#dimensions');

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
  var self = this;

  var scheduleShow = function(i, dimension){
    setTimeout(function(){
      $(dimension).addClass('show');
    }, i*50);
  };

  var scheduleHide = function(i, dimension){
    setTimeout(function(){
      $(dimension).removeClass('show');
    }, i*50);
  };

  // hide the dimensions
  this.$dimensions.find('.dimension').each(scheduleHide);

  // show the dimensions
  setTimeout(function(){
    // create the html to redraw the dimensions
    var html = '';
    self.dimensions.forEach(function(dimension){ html += dimension.html; });
    self.$dimensions.html(html);

    // wait, then animate
    setTimeout(function(){
      self.$dimensions.find('.dimension').each(scheduleShow);
    }, 1);
  }, 400);
};
