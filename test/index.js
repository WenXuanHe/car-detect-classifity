var cv = require('opencv');

var color       = [0, 255, 0];
var thickness   = 2;
var cascadeFile = '../classifier/stage3.xml';

var inputFiles = [
    '../positive_images/28636989.JPG',
    '../positive_images/28880785.JPG',
    '../positive_images/28921194.JPG'
];

inputFiles.forEach(function(fileName) {
  cv.readImage(fileName, function(err, im) {
    im.detectObject(cascadeFile, {neighbors: 2, scale: 2}, function(err, objects) {
      console.log(objects);
      for(var k = 0; k < objects.length; k++) {
        var object = objects[k];
        im.rectangle(
          [object.x, object.y],
          [object.x + object.width, object.y + object.height],
          color,
          2
        );
      }
      im.save(fileName.replace(/\.jpg/, 'processed.jpg'));
    });
  });
});