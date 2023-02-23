let nav = 0;
let events = [
  {
    name: "Monthly board meeting",
    starts_at_local: "2023-02-15 12:00:00",
    ends_at_local: "2023-02-15 13:00:00",
    type: "recurrent",
    department_id: 4  
  },
  {
    name: "AA meeting",
    starts_at_local: "2023-02-15 16:00:00",
    ends_at_local: "2023-02-15 17:00:00",
    type: "recurrent",
    department_id: 2
  },
  {
    name: "Job fair",
    starts_at_local: "2023-02-25 10:00:00",
    ends_at_local: "2023-02-25 18:00:00",
    type: "single",
    department_id: 3
  },
];

let departments = [

  {
    id: 2,
    color: '#AD9A9D'
  }, 
  {
    id: 3, 
    color: '#9aadaa'
  },
  {
    id: 4,
    color: '#ffe599'
  } 
  
]

const calendar = document.getElementById("hg-calendar");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lasDayOfMonth = new Date(year, month + 1, 0);

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const lastDayOfMonthNumeric = parseInt(
    lasDayOfMonth.toLocaleDateString("en-us", {
      day: "numeric",
    })
  );

  const paddingDaysStart = parseInt(
    weekdays.indexOf(dateString.split(", ")[0])
  );

  let paddingDaysEnd;
  if (paddingDaysStart >= 5 && lastDayOfMonthNumeric >= 30) {
    paddingDaysEnd = 42 - (lastDayOfMonthNumeric + paddingDaysStart);
  } else {
    paddingDaysEnd = 35 - (lastDayOfMonthNumeric + paddingDaysStart);
  }

  let lasDayOfReviousMonth = new Date(year, month, 0).getDate();
  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDaysStart + daysInMonth + paddingDaysEnd; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add(
      "day",
      "d-flex",
      "flex-column",
      "align-items-center",
      "m-1",
      "p-1",
      "cursor-pointer", 
      "text-white"
    );

    const dayString = `${month + 1}/${i - paddingDaysStart}/${year}`;
    let eventsForDay;
    if (events.length) {
      eventsForDay = events.filter(
        (e) => new Date(e.starts_at_local).toLocaleDateString() === dayString
      );
    }

    if (i > paddingDaysStart) {
      daySquare.innerText = i - paddingDaysStart;

      if (i - paddingDaysStart === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventsForDay.length) {
        for (const e of eventsForDay) {
          const eventDiv = document.createElement("span");
          eventDiv.classList.add(
            "event",
            "justify-content-center",
            "d-block",
            "p-1",
            "m-1",
            "border",
            "rounded-2"
          );
          eventDiv.innerText = e.name;
          eventDiv.style.backgroundColor = departments.find(d => d.id === e.department_id).color; 
          daySquare.appendChild(eventDiv);
        }
      }
    } else {
      daySquare.classList.add("padding", "text-muted");
      daySquare.innerText = lasDayOfReviousMonth - paddingDaysStart + i;
    }
    if (i > lastDayOfMonthNumeric + paddingDaysStart) {
      daySquare.classList.add("padding-end", "text-muted");
      daySquare.innerText = i - (lastDayOfMonthNumeric + paddingDaysStart);
    }

    calendar.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();
