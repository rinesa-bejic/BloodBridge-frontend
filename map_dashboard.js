function initBloodBridgeMap() {
  let centerCoordinates = [42.6667, 21.1667]; 
  let zoomLevel = 13;
  
  const urlParams = new URLSearchParams(window.location.search);
  const lat = parseFloat(urlParams.get('lat'));
  const lng = parseFloat(urlParams.get('lng'));
  const urgency = urlParams.get('urgency') || 'Normal'; 
  const locationName = urlParams.get('location') || "Requested Location";
  const hasSuccess = urlParams.get('success');

  // Inicializimi i hartes
  const map = L.map('interactiveMap').setView(centerCoordinates, zoomLevel);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(map);

  // KERKESA 1: Qendrimi i hartes te koordinatat e sakta qe erdhen nga Geocoding
  if (!isNaN(lat) && !isNaN(lng)) {
    centerCoordinates = [lat, lng];
    map.setView(centerCoordinates, 15); // Zoom me i afert per saktesi

    // KERKESA 2 edhe 3: Kodimi me ngjyra sipas urgjences
    let markerColor = "#6c757d"; // Normal
    if (urgency.toLowerCase() === "critical") {
      markerColor = "#e63946"; // E Kuqe
    } else if (urgency.toLowerCase() === "urgent") {
      markerColor = "#ff9f1c"; // Portokalli
    }

    // Markeri vizual ne piken e sakte gjeografike
    const bloodMarker = L.circleMarker([lat, lng], {
      radius: 12,
      fillColor: markerColor,
      color: "#ffffff",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    bloodMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; min-width: 160px;">
        <strong style="color: ${markerColor}; font-size: 13px; display: block;">
          ${urgency.toUpperCase()} REQUEST
        </strong>
        <b style="font-size: 14px; color: #1d3557;">📍 ${locationName}</b>
        <p style="font-size: 11px; color: #6c757d; margin: 4px 0 0 0;">Accurate Location Matching Active</p>
      </div>
    `).openPopup();

  } else if (navigator.geolocation) {
    // Nese nuk ka parametra, perdor lokacionin e perdoruesit
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      map.setView([userLat, userLng], 14);

      L.circleMarker([userLat, userLng], {
        radius: 8,
        fillColor: "#3498db",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map).bindPopup("You are here");
    });
  }

  if (hasSuccess === "true") {
    showToast(`Success! Location verified for "${locationName}"`);
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  
  toast.style.position = "fixed";
  toast.style.top = "100px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#1d3557";
  toast.style.color = "white";
  toast.style.padding = "14px 24px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.zIndex = "1000";
  toast.style.fontWeight = "600";
  toast.style.fontSize = "14px";
  toast.style.borderLeft = "5px solid #e63946";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.5s ease";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

window.addEventListener('DOMContentLoaded', initBloodBridgeMap);