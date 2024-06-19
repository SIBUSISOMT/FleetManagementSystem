const baseURL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('manage-routes-form').addEventListener('submit', manage Routes);
    document.getElementById('log-trip-form').addEventListener('submit', logTrip);
    loadRoutes();
    loadTrips();
  });
  
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
  }

function toEmployees(){
  window.location.href = "/public/employee.registration.html";
}


  
  function manageRoutes(event) {
    event.preventDefault();
    
    const routeData = {
      destination: document.getElementById('route-destination').value,
      departureTime: document.getElementById('route-departure-time').value
    };
    
    fetch(`${baseURL}/api/admin/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(routeData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from server:', data); // Log the response for debugging
      alert('Route added successfully');
      loadRoutes();
    })
    .catch(error => {
      console.error('Error adding route:', error);
    });
  }
  
  
  function logTrip(event) {
    event.preventDefault();
    
    const tripData = {
      date: document.getElementById('trip-date').value,
      start: document.getElementById('trip-start').value,
      end: document.getElementById('trip-end').value,
      mileage: document.getElementById('mileage').value,
      fuel: document.getElementById('fuel').value
    };
    
    fetch(`${baseURL}/api/admin/log-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Trip logged successfully');
      loadTrips();
    })
    .catch(error => {
      console.error('Error logging trip:', error);
    });
  }
  
  function loadRoutes() {
    fetch('/api/admin/routes')
      .then(response => response.json())
      .then(data => {
        const routeList = document.getElementById('route-list');
        routeList.innerHTML = '';
        data.routes.forEach(route => {
          const listItem = document.createElement('li');
          listItem.textContent = `Route to ${route.destination} at ${route.departureTime}`;
          routeList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading routes:', error);
      });
  }
  
  function loadTrips() {
    fetch('/api/admin/trips')
      .then(response => response.json())
      .then(data => {
        const tripList = document.getElementById('trip-list');
        tripList.innerHTML = '';
        data.trips.forEach(trip => {
          const listItem = document.createElement('li');
          listItem.textContent = `Trip on ${trip.date} from ${trip.start} to ${trip.end}, mileage: ${trip.mileage}, fuel used: ${trip.fuel}`;
          tripList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error loading trips:', error);
      });
  }
  