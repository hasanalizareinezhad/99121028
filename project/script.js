localStorage.clear();
document.addEventListener("DOMContentLoaded", () => {
  // Generate a unique ID
  function generateId() {
    const timestamp = Date.now().toString(36);
    const randomComponent = Math.random().toString(36).substring(2, 10);
    return timestamp + randomComponent;
  }

  // Initialize traveling cars
  let travelingCar = {
    car1: [],
    car2: [],
    car3: [],
  };

  // Reserve function
  function Reserve(firstName, lastName, carSelect, citySelect, date) {
    const userInfo = {
      id: generateId(),
      firstName: firstName.value,
      lastName: lastName.value,
      carSelect: carSelect.value,
      citySelect: citySelect.value,
      date: date.value,
    };

    if (Number(localStorage.getItem(`${userInfo.carSelect}`)) <= 0) {
      alert(`${userInfo.carSelect} is full`);
    } else {
      localStorage.setItem(
        `${userInfo.carSelect}`,
        `${Number(localStorage.getItem(`${userInfo.carSelect}`)) - 1}`
      );
      localStorage.setItem(`${userInfo.id}`, JSON.stringify(userInfo));
      travelingCar[userInfo.carSelect].push(userInfo);
      return userInfo;
    }
  }

  // DOM elements
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const citySelect = document.getElementById("citySelect");
  const carSelect = document.getElementById("carSelect");
  const date = document.getElementById("datepicker5");

  // Set car capacities
  localStorage.setItem(`car1`, "40");
  localStorage.setItem(`car2`, "40");
  localStorage.setItem(`car3`, "40");

  // Initialize Jalali Datepicker
  $(function () {
    $("#datepicker5").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });
  // Form submission handler
  document.getElementById("reservationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const reservedInfo = Reserve(
      firstName,
      lastName,
      carSelect,
      citySelect,
      date
    );
    console.log(reservedInfo);
  });

  function Show() {
    alert("hell");
  }
});
