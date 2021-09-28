// This is 'app.js' File of Fun2Learn - The Main App Running the Project

/*
==========================================================================================================================================================================================
                                                                        M A P   S E T T I N G
==========================================================================================================================================================================================
*/

const myMap = L.map('map').setView([25.9074872, 79.07306671], 5);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Siddhesh Mane';

const tileLayer = L.tileLayer(tileUrl, { attribution }).addTo(myMap);

/*
==========================================================================================================================================================================================
                                                                    P O P U P   F U N C T I O N
==========================================================================================================================================================================================
*/

// Function to Generate the content of Popup
function PopupContent(monuments){
    return `
        <div class="popup-content">
            <h4>${monuments.properties.name + '\n' + monuments.properties.state}</h4>
            <p>${monuments.properties.address}</p>
            <div class="img-container">
                <img src="${monuments.properties.src}" />
            </div>

            <div class="other">
            <h5 class="sub-title">Some other monuments: </h5>
               <ol class="other-monuments">
                    <li>${monuments.properties.other.monument_1}<li>
                    <li>${monuments.properties.other.monument_2}<li>
                    <li>${monuments.properties.other.monument_3}<li>
               </ul>
            </div>
        </div>
    `;
};

// Function to add Popup to the Map
function onEachFeature(feature, layer){
    layer.bindPopup(PopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
};

// Styling the Marker
const myIcon = L.icon({
    iconUrl: 'images/icon.png',
    iconSize: [20, 30],
    className: 'blinking',
});

// Assigning the Marker at proper co-ordinates of different monuments
const monumentLayer = L.geoJSON(monuments, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
            icon: myIcon
        });
    }
}).addTo(myMap);

/*
==========================================================================================================================================================================================
                                                    G E N E R A T E     M O N U M E N T S     L I S T
==========================================================================================================================================================================================
*/

// Function to generate the Monument List
function generateList(){
    const ul = document.querySelector('.state-list');
    monuments.forEach((monument) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');

        div.classList.add('state-item');
        
        a.innerHTML = monument.properties.state;
        a.href = "#two";
        a.addEventListener('click', () => {
            flyToMonument(monument);
        });

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);

        console.log(ul);
    });
}

// Call to the generateList Function
generateList();

/*
==========================================================================================================================================================================================
                                                                F L Y       T O     M O N U M E N T S
==========================================================================================================================================================================================
*/

// Function to Fly to Monuments
function flyToMonument(monument){
    const lat = monument.geometry.coordinates[1];
    const lng = monument.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 18, {
        duration: 5
    });

    setTimeout(() => {
        L.popup({
            closeButton: false, offset: L.point(0, -8)
        })
        .setLatLng([lat, lng])
        .setContent(PopupContent(monument))
        .openOn(myMap);
    }, 5000);  
};