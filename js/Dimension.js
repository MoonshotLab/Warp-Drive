// columnCount  : 2
// rowCount     : 5
// shapeCount   : 4
// shapes       : []
var Dimension = function(opts){
  var self = this;
  for(var key in opts){ this[key] = opts[key]; }


  // make the grid to hold shapes
  (function(){
    self.grid = [];
    for(var i=0; i<self.rowCount; i++){
      for(var j=0; j<self.columnCount; j++){
        self.grid.push({
          x     : j,
          y     : i,
          shape : null
        });
      }
    }
  }());


  // put a set number of shapes into random zones of the gris
  (function(){
    for(var i=0; i<self.shapeCount; i++){
      var zone = getZone();
      addShape(zone);
    }

    function addShape(zone){
      zone.shape = self.shapes[Math.floor(Math.random()*self.shapes.length)];
    }

    function getZone(){
      var unShapedZones = _.filter(self.grid, function(zone){
        if(zone.shape === null) return zone;
      });

      var random = unShapedZones[Math.floor(Math.random()*unShapedZones.length)];
      return random;
    }
  }());


  // make it html too!
  (function(){
    self.html = '<div class="dimension" style="width:' + self.width + '%"><table>';
    for(var i=0; i<self.rowCount; i++){
      self.html += '<tr>';
      for(var j=0; j<self.columnCount; j++){
        var zone = _.findWhere(self.grid, { x : j, y : i });
        var shape = zone.shape || '';
        self.html += '<td style="width: ' + 100/self.columnCount + '%; height:' + self.cellHeight + 'px">';
        self.html += '<div class="shape ' + shape + '"></div>';
        self.html += '</td>';
      }
      self.html += '</tr>';
    }
    self.html += '</table></div>';
  }());


  return this;
};
