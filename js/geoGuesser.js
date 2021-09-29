// This is 'GeoGuesser.js' File of Fun2Learn

/*
==========================================================================================================================================================================================
                                                                       S E T T I N G    M A P
==========================================================================================================================================================================================
*/

// Setting the Map
const myMap = L.map('map').setView([25.9074872, 79.07306671], 5);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Siddhesh Mane';

const tileLayer = L.tileLayer(tileUrl, { attribution }).addTo(myMap);



// Shuffling the Monuments JSON
const shuffled = monuments.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selected = shuffled.slice(0, 10);

/*
==========================================================================================================================================================================================
                                                            O N     C L I C K I N G     N E X T     F U N C T I O N
==========================================================================================================================================================================================
*/

var count = 10;
var i = 0;

const next = document.querySelector('.next');
next.addEventListener("click", () => {
    
    while(count > 0){
        next.innerHTML = 'Next'
        document.querySelector('.geo-question').innerHTML = 'Where is ' + monuments[i].properties.name + ' ?';
        console.log('Where is ' + monuments[i].properties.name + ' ?');

        lng1 = monuments[i].geometry.coordinates[0];
        lat1 = monuments[i].geometry.coordinates[1];

        i++;
        count--;

        break;
    }

    if(count == 0){
        next.innerHTML = 'Game Over';
    }
    
    if(count == 0){
        next.addEventListener("click", () => {      
            modal_container2.classList.remove("show");
        })
    }
});

var myIcon = L.icon({
    iconUrl: 'images/icon.png',
    iconSize: [40, 50],
    className: 'blinking',
})

/*
==========================================================================================================================================================================================
                                                            M A R K E R     P L O T T I N G     A N D       R E S U L T
==========================================================================================================================================================================================
*/

myMap.on('click', (e) => {

    // Getting User Clicked Latitudes and Longitudes
    lng2 = e.latlng.lng;
    lat2 = e.latlng.lat;

    // Marker-2: User enter latlng based marke
    var marker2 = new L.marker([lat2, lng2]);
    marker2.addTo(myMap);
    marker2.bindPopup('Your Selected Location')

    // Calculating Distance
    var distanceKm = ( getDistance([lat1, lng1], [lat2, lng2]) ) / 1000;    // IN KM
    var distanceMiles = distanceKm * 0.621371;                              // IN MILES

    var score = 0;
    if(distanceKm < 100){
        score++;
    }
    
    var marker1 = new L.marker([lat1, lng1], {icon: myIcon});
    marker1.addTo(myMap);
    marker1.bindPopup('Actual Location')


    var pointA = new L.LatLng(lat1, lng1);
    var pointB = new L.LatLng(lat2, lng2);
    var pointList = [pointA, pointB];
    
    var firstpolyline = new L.Polyline(pointList, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    firstpolyline.addTo(myMap);

    document.querySelector('.guess-result').innerHTML = 'Your Guess was ' + distanceKm + ' km (' + distanceMiles + ' miles) from the correct location';

});

/*
==========================================================================================================================================================================================
                                                                C A L C U L A T E       D I S T A N C E     F U N C T I O N
==========================================================================================================================================================================================
*/

// Function to Get Distance between two points
function getDistance(origin, destination){

    var lng1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lng2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lng2 - lng1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;

    return c * EARTH_RADIUS * 1000;
}

// Function to Convert Degree to Radian
function toRadian(degree){
    return degree*Math.PI / 180;
}
