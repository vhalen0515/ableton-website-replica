const menuBtn = document.getElementById("header-menu-btn");
const closeBtn = document.getElementById("close-menu-btn");
const menuContainer = document.getElementById("mobile-menu-container");
const body = document.body;

menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("active");
    body.classList.toggle("no-scroll");
});

closeBtn.addEventListener("click", () => {
    menuContainer.classList.remove("active");
    body.classList.remove("no-scroll");
});

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
        const sortedCountries = data.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        const select = document.getElementById("country");
        sortedCountries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.cca2;
            option.textContent = country.name.common;
            select.appendChild(option);
        });
    })
    .catch((error) => console.error("Error fetching countries:", error));
