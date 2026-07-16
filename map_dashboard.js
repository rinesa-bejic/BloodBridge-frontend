function initBloodBridgeMap() {
  const centerCoordinates = [42.6667, 21.1667]; 
  
  const map = L.map('interactiveMap').setView(centerCoordinates, 14);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);
}

window.addEventListener('DOMContentLoaded', initBloodBridgeMap);