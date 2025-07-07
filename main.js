// User form training – Week 4
// This script captures and stores user data using Local Storage,
// counts session interactions with Session Storage,
// and displays results in the DOM

// Step 1: Handle form submission and store data
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form reload

  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");

  if (!nameInput || !ageInput) {
    console.error("Form elements not found.");
    return;
  }

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value);

  if (!isNaN(name)) {
    alert("⚠️ El nombre no puede ser un número.");
    return;
  }

  if (age <= 0) {
    alert("⚠️ La edad debe ser mayor que cero.");
    return;
  }

  if (name && !isNaN(age)) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    displayStoredData();
    updateSessionCount(); // Increment interaction count on save
    alert("¡Datos guardados correctamente!");
    document.getElementById("userForm").reset();
  } else {
    alert("⚠️ Por favor, ingrese un nombre válido y una edad numérica.");
  }
});

// Step 2: Display stored data from Local Storage
function displayStoredData() {
  const name = localStorage.getItem("userName");
  const age = localStorage.getItem("userAge");
  const output = document.getElementById("output");

  if (name && age) {
    output.textContent = `👤 Nombre: ${name} | Edad: ${age}`;
  } else {
    output.textContent = "No stored user data.";
  }
}

// Step 3: Count session interactions using Session Storage
function updateSessionCount() {
  let sessionCount = sessionStorage.getItem("count");

  if (!sessionCount) {
    sessionCount = 1;
  } else {
    sessionCount = parseInt(sessionCount) + 1;
  }

  sessionStorage.setItem("count", sessionCount);

  const sessionDiv = document.getElementById("sessionCount");
  sessionDiv.textContent = "Interacciones en esta sesión: " + sessionCount;
}

// Step 4: Clear Local Storage and update UI
document.getElementById("clearData").addEventListener("click", function () {
  localStorage.clear();
  displayStoredData();
  updateSessionCount(); //Increment interaction count on clear
  alert("🗑️ Datos eliminados.");
  document.getElementById("output").textContent = "Datos borrados.";
});

// Step 5: Run display and session count on page load
window.onload = function () {
  displayStoredData();
  updateSessionCount(); // Increment count on page load too
};
