
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}


function toDriver(){
  window.location.href = '/public/views/forgot.password.html';
}

function toEmployee(){
  window.location.href = '/public/views/forgot.password.html';
}
function Mantainance(){
  window.location.href = '/public/views/forgot.password.html';
}
function toServiceRequests(){
  window.location.href = '/public/viewsforgot.password.html';
}
function toViewRequests(){
  window.location.href = '/public/views/forgot.password.html';
}
function to(){
  window.location.href = '/public/forgot.password.html';
}
function toDriver(){
  window.location.href = '/public/forgot.password.html';
}
function toDriver(){
  window.location.href = '/public/forgot.password.html';
}