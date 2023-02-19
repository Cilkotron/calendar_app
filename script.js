let nav = 0;
let events = [
  {
    name: "Monthly board meeting",
    starts_at_local: '2023-02-15 12:00:00',
    ends_at_local: '2023-02-15 13:00:00', 
    type: "recurrent"
  },
  {
    name: "AA meeting",
    starts_at_local: '2023-02-15 16:00:00',
    ends_at_local: '2023-02-15 17:00:00', 
    type: "recurrent"

  }, 
  {
    name: "Job fair",
    starts_at_local: '2023-02-25 10:00:00',
    ends_at_local: '2023-02-25 18:00:00', 
    type: "single"
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


  const lastDayOfMonthNumeric = parseInt(lasDayOfMonth.toLocaleDateString("en-us", {
    day: "numeric",
  }));
 

  
  const paddingDaysStart = parseInt(weekdays.indexOf(dateString.split(", ")[0]));

 

  let paddingDaysEnd 
  if(paddingDaysStart >= 5 && lastDayOfMonthNumeric >= 30) {
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
    daySquare.classList.add("day", "d-flex", "flex-column", "justify-content-between", "align-items-center", "m-1", "p-1", "cursor-pointer");
    
    const dayString = `${month + 1}/${i - paddingDaysStart}/${year}`; 
    let eventForDay 
    if(events.length) {
      eventForDay = events.find(e => new Date(e.starts_at_local).toLocaleDateString() === dayString);
    }
    


    if (i > paddingDaysStart) {
      daySquare.innerText = i - paddingDaysStart;

      if (i - paddingDaysStart === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        const eventDiv = document.createElement('span');
        eventDiv.classList.add("event", "justify-content-center", "position-absolute", "mt-5");
        eventDiv.innerText = eventForDay.name;
        daySquare.appendChild(eventDiv);
      }
    } else {
      daySquare.classList.add("padding", "text-muted");
      daySquare.innerText = lasDayOfReviousMonth - paddingDaysStart + i;
    }
    if(i > lastDayOfMonthNumeric + paddingDaysStart){
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
