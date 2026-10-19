const people = [
  { name: "Aisha Khan", age: 21, city: "Cairo" },
  { name: "Omar Hassan", age: 23, city: "Alexandria" },
  { name: "Mariam Ali", age: 20, city: "Giza" },
  { name: "Youssef Samir", age: 22, city: "Cairo" },
  { name: "Nour Ahmed", age: 19, city: "Mansoura" },
  { name: "Karim Mostafa", age: 24, city: "Tanta" },
  { name: "Salma Ibrahim", age: 21, city: "Giza" },
  { name: "Adam Farouk", age: 20, city: "Alexandria" },
];

const search = document.querySelector("#search");
const rows = document.querySelector("#people-rows");
let sortBy = "";
let descending = false;

function showPeople() {
  const query = search.value.toLowerCase();
  let results = people.filter((person) =>
    `${person.name} ${person.age} ${person.city}`.toLowerCase().includes(query),
  );

  if (sortBy) {
    results = results.sort((a, b) =>
      (sortBy === "age" ? a.age - b.age : a.name.localeCompare(b.name)) *
      (descending ? -1 : 1),
    );
  }

  rows.innerHTML = results
    .map((person) => `<tr><td>${person.name}</td><td>${person.age}</td><td>${person.city}</td></tr>`)
    .join("");
  document.querySelector("#result-count").textContent = `${results.length} people shown`;
}

search.addEventListener("input", showPeople);

document.querySelector("#sort-name").addEventListener("click", () => {
  descending = sortBy === "name" && !descending;
  sortBy = "name";
  showPeople();
});

document.querySelector("#sort-age").addEventListener("click", () => {
  descending = sortBy === "age" && !descending;
  sortBy = "age";
  showPeople();
});

showPeople();
