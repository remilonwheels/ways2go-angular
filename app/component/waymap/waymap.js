'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', WayMapController],
  controllerAs: 'wayMapCtrl'
};

function WayMapController($log, $http, $interval, NgMap) {
  $log.debug('WayMapController');

  this.ways = [];

  // this.drawWays = function(startLocation, endLocation) {
  //   NgMap.getMap().then( map => {
  //     const LatLng = google.maps.LatLng,
  //     LatLngBounds = google.maps.LatLngBounds,
  //     Marker = google.maps.Marker,
  //     Point = google.maps.Point;
  //
  //     const curvature = .3;
  //
  //     // This is the initial location of the points
  //     // (you can drag the markers around after the map loads)
  //     var pos1 = new LatLng(startLocation);
  //     var pos2 = new LatLng(endLocation);
  //     // var pos1 = new LatLng(23.634501, -102.552783);
  //     // var pos2 = new LatLng(17.987557, -92.929147);
  //
  //     var bounds = new LatLngBounds();
  //     bounds.extend(pos1);
  //     bounds.extend(pos2);
  //
  //     map.fitBounds(bounds);
  //
  //     var markerP1 = new Marker({
  //       position: pos1,
  //       label: 'start',
  //       map: map
  //     });
  //     var markerP2 = new Marker({
  //       position: pos2,
  //       label: 'end',
  //       map: map
  //     });
  //
  //     var pos1 = markerP1.getPosition(), // latlng
  //     pos2 = markerP2.getPosition(),
  //     projection = map.getProjection(),
  //     p1 = projection.fromLatLngToPoint(pos1), // xy
  //     p2 = projection.fromLatLngToPoint(pos2);
  //
  //     // Calculate the arc.
  //     // To simplify the math, these points
  //     // are all relative to p1:
  //     var e = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
  //     m = new Point(e.x / 2, e.y / 2), // midpoint
  //     o = new Point(e.y, -e.x), // orthogonal
  //     c = new Point( // curve control point
  //       m.x + curvature * o.x,
  //       m.y + curvature * o.y);
  //
  //     var pathDef = `M 0,0 q ${c.x},${c.y} ${e.x},${e.y}`;
  //
  //     var zoom = map.getZoom(),
  //     scale = 1 / (Math.pow(2, -zoom));
  //
  //     var symbol = {
  //       path: pathDef,
  //       scale: scale,
  //       strokeWeight: 2,
  //       fillColor: 'none'
  //     };
  //
  //     let curveMarker = new Marker({
  //       position: pos1,
  //       clickable: false,
  //       icon: symbol,
  //       zIndex: 0, // behind the other markers
  //       map: map
  //     });
  //   });
  // };
};
