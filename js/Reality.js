// columnCount  : 2
// rowCount     : 5
// shapes       : []
var Reality = function(opts){
  var self = this;
  for(var key in opts){ this[key] = opts[key]; }

  // keep track of the current shape and x/y coords
  this.shape = this.shapes[0];
  this.xPos = 0;
  this.yPos = 0;

  // make the grid to hold shapes
  (function(){
    self.grid = [];
    for(var i=0; i<self.rowCount; i++){
      for(var j=0; j<self.columnCount; j++){
        self.grid.push({
          x         : j,
          y         : i,
          occupied  : false
        });
      }
    }

    self.grid[0].occupied = true;
  }());


  // make it html too!
  (function(){
    self.html = '<table class="reality">';
    for(var i=0; i<self.rowCount; i++){
      self.html += '<tr>';
      for(var j=0; j<self.columnCount; j++){
        var klass = 'class="x' + j + '-y' + i + '"';
        self.html += '<td ' + klass + ' style="width: ' + 100/self.columnCount + '%; height:' + self.cellHeight + 'px">';
        if(i === 0 && j === 0) self.html += '<div class="shape square"></div>';
        else self.html += '&nbsp;';
        self.html += '</td>';
      }
      self.html += '</tr>';
    }
    self.html += '</table>';

    $('#reality').html(self.html);
    self.$dom = $('#reality').find('table');
  }());


  // handle the keyboard events
  (function(){
    window.addEventListener('keydown', function(e){
      var directions  = [37, 38, 39, 40];
      var shifters    = [65, 83];

      if(directions.indexOf(e.keyCode) != -1) self.move(e.keyCode);
      if(shifters.indexOf(e.keyCode) != -1) self.shapeShift(e.keyCode);
    });
  }());

  return this;
};



// move the object around it's grid
Reality.prototype.move = function(keyCode){
  var zone = _.findWhere(this.grid, { occupied : true });
  var nextZone = null;

  if(keyCode == 39)
    nextZone = _.findWhere(this.grid, { x : zone.x + 1, y : zone.y });
  else if(keyCode == 37)
    nextZone = _.findWhere(this.grid, { x : zone.x - 1, y : zone.y });
  else if(keyCode == 38)
    nextZone = _.findWhere(this.grid, { y : zone.y - 1, x : zone.x });
  else if(keyCode == 40)
    nextZone = _.findWhere(this.grid, { y : zone.y + 1, x : zone.x });

  if(nextZone){
    zone.occupied = false;
    nextZone.occupied = true;
    this.xPos = nextZone.x;
    this.yPos = nextZone.y;
    this.$dom.find('.x' + zone.x + '-y' + zone.y).html('&nbsp;');
    this.$dom.find('.x' + nextZone.x + '-y' + nextZone.y).html(
      '<div class="shape ' + this.shape + '"></div>'
    );
  }
};



Reality.prototype.shapeShift = function(keyCode){
  var currentIndex = this.shapes.indexOf(this.shape);
  var nextIndex = 0;

  if(keyCode == 65){
    if(currentIndex - 1 >= 0)
      nextIndex = currentIndex - 1;
    else
      nextIndex = this.shapes.length - 1;
  } else if(keyCode == 83){
    if(currentIndex + 1 <= this.shapes.length - 1)
      nextIndex = currentIndex + 1;
    else
      nextIndex = 0;
  }

  this.shape = this.shapes[nextIndex];
  this.$dom.find('.shape').removeClass('square circle triangle');
  this.$dom.find('.shape').addClass(this.shape);
};



Reality.prototype.looksLike = function(dimension){
  var self = this;
  var zonesWithShapes = _.filter(dimension.grid, function(zone){
    return zone.shape;
  });

  var passes = false;
  zonesWithShapes.forEach(function(zone){
    if(zone.shape == self.shape && zone.x == self.xPos && zone.y == self.yPos)
      passes = true;
  });

  return passes;
};
