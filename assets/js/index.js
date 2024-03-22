const fullData = {
    staff_name: null,
    service_name: null,
    price: null,
    staff_id: null,
    service_id: null,
    date: null,
    start_time: null,
    end_time: null,
    customer: {
        name: null,
        surname: null,
        email: null,
        phone: null,
    },
};

const staffs = [
    {
        "id": 1,
        "name": "Alex Rosetta",
        "email": "alexyrosetta@egmail.com",
        "image": "staff-1.png",
    },
    {
        "id": 2,
        "name": "Maria July",
        "email": "mariajuly@egmail.com",
        "image": "staff-2.png",

    }

]

const services = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "service-1.jpg",
        "duration": "1 hour",
        "price": 50.00,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "service-2.jpg",
        "duration": "1 hour 30 minutes",
        "price": 120.00,
    },
    {
        "id": 3,
        "name": "Check up",
        "image": "service-3.jpg",
        "duration": "1 hour 12 minutes",
        "price": 140.00,
    }

]

const dates = [
    "2022-03-04", "2022-03-05", "2022-03-06",
    "2023-01-04", "2023-01-05", "2023-01-06",
    "2024-02-04", "2024-02-05", "2024-02-06",
    "2024-03-04", "2024-03-05", "2024-03-06",
    "2024-04-04", "2024-04-05", "2024-04-06",
    "2024-05-04", "2024-05-05", "2024-05-06",
    "2024-06-04", "2024-06-05", "2024-06-06"
]

const times = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:00",
        "end_time": "10:30"
    }

]
let active = 1;

const nextButton = document.querySelector(".btn-next");
const backButton = document.querySelector(".btn-back");
const steps = document.querySelectorAll(".step");
const content_steps = document.querySelectorAll(".content-step");
const error = document.querySelector(".c-footer span");
const error_content = document.querySelector(".error-content");

const staffsContainer = document.querySelector(".data-1 .c-body");
let staff_item = "";
staffs.forEach((item) => {
    staff_item += `
    <li id=${item.id}>
    <img src='assets/images/${item.image}'>
    <div class="about">
    <h3>${item.name}</h3>
    <p>${item.email}</p>
    </div>
    </li>`
})
staffsContainer.innerHTML = `<ul>` + staff_item + `</ul>`;

const staff_li = document.querySelectorAll(".data-1 .c-body ul li");
staff_li.forEach(li => {
    li.addEventListener("click", () => {
        error.classList.remove('show');
        active++;
        updateProgress();
        fullData.staff_id = li.id;
        fullData.staff_name = staffs[(li.id) - 1].name;
        const doneStaffs = document.querySelectorAll(".data-1 .c-body ul li.done");
        doneStaffs.forEach((staff) => {
            staff.classList.remove("done");
            if (staff.id != fullData.staff_id) {
                resetData(1);
                resetData(2);
                resetData(3);
                resetData(4)
            }

        });
        li.classList.add("done");
    })
});

const servicesContainer = document.querySelector(".data-2 .c-body");
let service_item = "";
services.forEach((item) => {
    service_item += `
    <li id=${item.id}>
    <img src='assets/images/${item.image}'>
    <div class="about">
    <h3>${item.name}</h3>
    <p>${item.duration}</p>
    </div>
    <span>${item.price}$</span>
    </li>`
})
servicesContainer.innerHTML = `<ul>` + service_item + `</ul>`;

const service_li = document.querySelectorAll(".data-2 .c-body ul li");

service_li.forEach(li => {
    li.addEventListener("click", () => {
        error.classList.remove('show');
        active++;
        updateProgress();
        fullData.service_id = li.id;
        fullData.service_name = services[(li.id) - 1].name;
        fullData.price = services[(li.id) - 1].price;
        const doneServices = document.querySelectorAll(".data-2 .c-body ul li.done");

        doneServices.forEach((service) => {
            service.classList.remove("done");
            if (service.id != fullData.service_id) {
                resetData(2);
                resetData(3);
                resetData(4)

            }
        });

        li.classList.add("done");
    })
});

const prevMonthBtn = document.querySelector(".prev");
const nextMonthBtn = document.querySelector(".next");
const monthYear = document.querySelector(".month-year");
const daysContainer = document.querySelector(".days");
let currentDate = new Date();

function renderDates() {
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    monthYear.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    let days = "";
    for (let i = firstDayIndex; i > 0; i--) {
        days += `<div class="day prev">${prevLastDay - i + 1}</div>`;
    }
    for (let i = 1; i <= lastDay; i++) {
        let date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)}-${i < 10 ? "0" + i : i}`
        let date_index = dates.indexOf(date)
        if (dates.includes(date.toString())) {
            days += `<div class="${(fullData.date == date) ? 'day active done' : 'day active'}" onclick="selectDate(this)" id=${date_index}>${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }
    daysContainer.innerHTML = days;
}
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderDates();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderDates();
});
renderDates()

function selectDate(n) {
    error.classList.remove('show');
    fullData.date = dates[n.id];
    const doneDates = document.querySelectorAll(".day.active.done");
    doneDates.forEach((date) => {
        date.classList.remove("done");
        if (dates[date.id] != fullData.date) {
            resetData(3);
            resetData(4);
        }
    });
    renderTimes();
    n.classList.add("done");
}

const times_selectedDate = document.querySelector(".select-date");
const timesContainer = document.querySelector(".times");
function renderTimes() {
    times_selectedDate.innerText = fullData.date
    let time = "";
    times.forEach((item) => {
        time += `<div ${(fullData.start_time == item.start_time) ? "class= 'r-time active done'" : "class= 'r-time active'"} onclick=selectTime(this) id=${times.indexOf(item)}><span>${item.start_time}</span><span>${item.end_time}</span></div>`;
    })
    timesContainer.innerHTML = time;
}

function selectTime(n) {
    error.classList.remove('show');
    active++;
    fullData.start_time = times[n.id].start_time;
    fullData.end_time = times[n.id].end_time;

    const doneTimes = document.querySelectorAll(".r-time.active.done");
    doneTimes.forEach((time) => {
        time.classList.remove("done");
        if (times[time.id].start_time != fullData.start_time) {
            resetData(4)
        }
    });
    n.classList.add("done");
    updateProgress();
    LoadNoteData();
}

const confirmBtn = document.querySelector(".confirm-btn")
const failModal = document.getElementById('failModal');
const failModal_content = failModal.querySelector(".modal-content")

const successModal = document.getElementById('successModal');
const successModal_content = successModal.querySelector(".modal-content")
const closeBtn = document.querySelectorAll('.close');

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const notes = document.getElementById("notes")

function LoadNoteData() {
    let note_data = ""
    note_data += `<p><span>Staff:</span>${fullData.staff_name}</p>
  <p><span>Service:</span>${fullData.service_name}</p>
  <p><span>Date:</span>${fullData.date} / ${fullData.start_time}-${fullData.end_time}</p>
  <p><span>Price:</span><span>$${fullData.price}</span></p>`;

    notes.innerHTML = note_data;
}

nextButton.addEventListener("click", () => {
    if ((active == 1 && fullData.staff_id == null)) {
        error_content.innerText = "SELECT STAFF"
        error.classList.add("show");
        setTimeout(() => {
            error.classList.remove('show');
        }, 3500);
    }
    else if ((active == 2 && fullData.service_id == null)) {
        error_content.innerText = "SELECT SERVICE"
        error.classList.add("show");
        setTimeout(() => {
            error.classList.remove('show');
        }, 3500);
    }
    else if ((active == 3 && fullData.date == null)) {
        error_content.innerText = "SELECT DATE & TIME"
        error.classList.add("show");
        setTimeout(() => {
            error.classList.remove('show');
        }, 3500);
    }
    else if ((active == 3 && fullData.start_time == null)) {
        error_content.innerText = "SELECT DATE & TIME"
        error.classList.add("show");
        setTimeout(() => {
            error.classList.remove('show');
        }, 3500);
    }
    else {
        error.classList.remove('show');
        active++;
        if (active > steps.length) {
            active = 1;
        }
        if (active == steps.length) {
            LoadNoteData();
        }
        updateProgress();
    }
})
confirmBtn.addEventListener("click", () => {

    if (!firstName.value || !lastName.value || !email.value || !phone.value) {
        failModal.style.display = 'block';
        setTimeout(() => {
            failModal.style.opacity = 1;
        }, 60);
        setTimeout(() => {
            failModal_content.style.opacity = 1;
            failModal_content.style.top = '50%';
        }, 70);

    } else {
        let consoleData = {
            staff_id: Number(fullData.staff_id),
            service_id: Number(fullData.service_id),
            date: fullData.date,
            time: fullData.start_time,
            customer: {
                name: firstName.value,
                surname: lastName.value,
                email: email.value,
                phone: phone.value,
            },
        }
        console.log(consoleData)
        successModal.style.display = 'block';
        setTimeout(() => {
            successModal.style.opacity = 1;
        }, 60);
        setTimeout(() => {
            successModal_content.style.opacity = 1;
            successModal_content.style.top = '50%';
        }, 70);

        active = 1;
        updateProgress();
        resetData(1);
        resetData(2);
        resetData(3);
        resetData(4);
        resetData(5);
    }
})
closeBtn.forEach(item => {
    item.addEventListener("click", () => {

        setTimeout(() => {
            failModal_content.style.opacity = 0;
            failModal_content.style.top = '30%';
        }, 70);
        setTimeout(() => {
            failModal.style.opacity = 1;
            failModal.style.display = 'none';
        }, 500);

        setTimeout(() => {
            successModal_content.style.opacity = 0;
            successModal_content.style.top = '30%';
        }, 70);
        setTimeout(() => {
            successModal.style.opacity = 1;
            successModal.style.display = 'none';
        }, 500);
    })
})
window.onclick = function (event) {
    if (event.target == failModal || event.target == successModal) {
        setTimeout(() => {
            failModal_content.style.opacity = 0;
            failModal_content.style.top = '30%';
        }, 70);
        setTimeout(() => {
            failModal.style.opacity = 1;
            failModal.style.display = 'none';
        }, 500);

        setTimeout(() => {
            successModal_content.style.opacity = 0;
            successModal_content.style.top = '30%';
        }, 70);
        setTimeout(() => {
            successModal.style.opacity = 1;
            successModal.style.display = 'none';
        }, 500);
    }
}
backButton.addEventListener("click", () => {
    error.classList.remove('show');
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
}
)
const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i == (active - 1)) {
            step.querySelector("span").innerText = `${active}`
            step.classList.remove("done");
            step.classList.add("active");
            content_steps[i].classList.add("active");
        } else if (i < (active - 1)) {
            step.querySelector("span").innerHTML = `<img src="assets/images/icons/done.svg" />`
            step.classList.add("done");
            step.classList.remove("active");
            content_steps[i].classList.remove("active");
        } else {
            step.querySelector("span").innerText = `${i + 1}`
            step.classList.remove("active");
            step.classList.remove("done");
            content_steps[i].classList.remove("active");
        }

        if (active > 1) {
            backButton.classList.remove("no-display")
        }
        else if (active == 1) {
            backButton.classList.add("no-display");
        }

        if (active == steps.length) {
            confirmBtn.style.display = "block"
            nextButton.style.display = "none"
        }
        else {
            confirmBtn.style.display = "none"
            nextButton.style.display = "block"
        }
    })
}



function resetData(step) {
    if (step == 1) {
        fullData.service_id = null;
        const doneServices = document.querySelectorAll(".data-2 .c-body ul li.done");
        doneServices.forEach((service) => {
            service.classList.remove("done");
        });
    }
    else if (step == 2) {
        fullData.date = null;
        const doneDates = document.querySelectorAll(".day.active.done");
        doneDates.forEach((day) => {
            day.classList.remove("done");
            day.classList.add("active")
        });
    }
    else if (step == 3) {
        fullData.start_time = null;
        const activeTimes = document.querySelectorAll(".r-time.active");
        activeTimes.forEach((time) => {
            time.classList.remove("done");
            time.classList.remove("active")
        });
        times_selectedDate.innerText = "Select date"
    }
    else if (step == 4) {
        firstName.value = null;
        lastName.value = null;
        email.value = null;
        phone.value = null;
    }
    else if (step == 5) {
        fullData.staff_name = null;
        fullData.service_name = null;
        fullData.price = null;
        fullData.end_time = null;

        fullData.staff_id = null;
        const doneStaffs = document.querySelectorAll(".data-1 .c-body ul li.done");
        doneStaffs.forEach((staff) => {
            staff.classList.remove("done");
        });
    }
}
