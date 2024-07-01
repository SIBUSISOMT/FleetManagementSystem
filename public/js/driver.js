
document.addEventListener('DOMContentLoaded', () => {
  loadTrips();
  document.getElementById('report-issue-form').addEventListener('submit', reportIssue);
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

function loadTrips() {
  fetch('/api/driver/trips')
    .then(response => response.json())
    .then(data => {
      const tripList = document.getElementById('trip-list');
      tripList.innerHTML = '';
      data.trips.forEach(trip => {
        const listItem = document.createElement('li');
        listItem.textContent = `Trip on ${trip.date} from ${trip.start} to ${trip.end}, mileage: ${trip.mileage}, fuel used: ${trip.fuel}`;
        listItem.addEventListener('click', () => {
          document.getElementById('trip-id').value = trip.id;
          showSection('report-issue');
        });
        tripList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error loading trips:', error);
    });
}

function reportIssue(event) {
  event.preventDefault();

  const issueData = {
    tripId: document.getElementById('trip-id').value,
    description: document.getElementById('issue-description').value,
    date: document.getElementById('issue-date').value
  };
  
  fetch('/api/driver/report-issue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issueData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Issue reported successfully');
    showSection('view-trips');
    loadTrips();
  })
  .catch(error => {
    console.error('Error reporting issue:', error);
  });
}









// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/api/drivers')
//       .then(response => response.json())
//       .then(data => {
//         const app = document.getElementById('app');
//         const driverList = document.createElement('ul');
//         data.forEach(driver => {
//           const listItem = document.createElement('li');
//           listItem.textContent = `${driver.first_name} ${driver.last_name}`;
//           driverList.appendChild(listItem);
//         });
//         app.appendChild(driverList);
//       });
//   });
  