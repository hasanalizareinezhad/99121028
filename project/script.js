document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const citySelect = document.getElementById("citySelect");
  const carSelect = document.getElementById("carSelect");
  const date = document.getElementById("datepicker5");
  const reservationList = document.getElementById("reservationList");

  // Generate a unique ID
  function generateId() {
    const timestamp = Date.now().toString(36);
    const randomComponent = Math.random().toString(36).substring(2, 10);
    return timestamp + randomComponent;
  }

  // Initialize car capacities in localStorage if not already set
  function initializeCarCapacities() {
    if (!localStorage.getItem("car1")) {
      localStorage.setItem("car1", "40");
      localStorage.setItem("car2", "40");
      localStorage.setItem("car3", "40");
    }
  }

  // Initialize traveling cars
  let travelingCar = {
    car1: [],
    car2: [],
    car3: [],
  };

  // Load existing reservations from localStorage
  function loadReservations() {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith("res_")) {
        const reservation = JSON.parse(localStorage.getItem(key));
        travelingCar[reservation.carSelect].push(reservation);
      }
    }
  }

  // Display reservations
  function displayReservations() {
    reservationList.innerHTML = "";
    for (let car in travelingCar) {
      travelingCar[car].forEach((reservation) => {
        const li = document.createElement("li");
        li.textContent = `${reservation.firstName} ${reservation.lastName} - ${reservation.citySelect} - ${reservation.carSelect} - ${reservation.date}`;
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = () =>
          cancelReservation(reservation.id, reservation.carSelect);
        li.appendChild(cancelButton);
        reservationList.appendChild(li);
      });
    }
  }

  // Cancel reservation
  function cancelReservation(reservationId, carSelect) {
    localStorage.removeItem(`res_${reservationId}`);
    travelingCar[carSelect] = travelingCar[carSelect].filter(
      (res) => res.id !== reservationId
    );
    localStorage.setItem(
      carSelect,
      Number(localStorage.getItem(carSelect)) + 1
    );
    displayReservations();
  }

  // Reserve function
  function reserveTicket(firstName, lastName, carSelect, citySelect, date) {
    const userInfo = {
      id: generateId(),
      firstName: firstName.value,
      lastName: lastName.value,
      carSelect: carSelect.value,
      citySelect: citySelect.value,
      date: date.value,
    };

    const carCapacity = Number(localStorage.getItem(userInfo.carSelect));

    if (carCapacity <= 0) {
      alert(`${userInfo.carSelect} is full`);
      return null;
    } else {
      localStorage.setItem(userInfo.carSelect, carCapacity - 1);
      localStorage.setItem(`res_${userInfo.id}`, JSON.stringify(userInfo));
      travelingCar[userInfo.carSelect].push(userInfo);
      return userInfo;
    }
  }

  // Reset form fields
  function resetForm() {
    firstName.value = "";
    lastName.value = "";
    carSelect.value = "";
    citySelect.value = "";
    date.value = "";
  }

  // Validate form fields
  function validateFields() {
    const fields = [firstName, lastName, carSelect, citySelect, date];
    let isValid = true;
    fields.forEach((field) => {
      if (!field.value) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });
    return isValid;
  }

  // Initialize car capacities and load existing reservations
  initializeCarCapacities();
  loadReservations();
  displayReservations();

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
    if (validateFields()) {
      const reservedInfo = reserveTicket(
        firstName,
        lastName,
        carSelect,
        citySelect,
        date
      );
      if (reservedInfo) {
        alert("رزرو با موفقیت انجام شد");
        resetForm();
        displayReservations();
      }
    } else {
      alert("لطفا تمامی فیلدها را پر کنید");
    }
  });
});
