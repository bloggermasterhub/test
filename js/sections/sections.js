const sections = [
    "7-CARNATION",
    "7-CAMIA",
    "8-RUBY",
    "9-EINSTEIN",
    "9-GALILEO"
];

const input = document.getElementById("gradeSection");
const suggestions = document.getElementById("gradeSuggestions");

input.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    suggestions.innerHTML = "";

    if (value === "") {
        suggestions.style.display = "none";
        return;
    }

    const matches = sections.filter(section =>
        section.toLowerCase().includes(value)
    );

    if (matches.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    matches.forEach(match => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.textContent = match;

        item.addEventListener("click", function () {
            input.value = match;
            suggestions.style.display = "none";
        });

        suggestions.appendChild(item);
    });

    suggestions.style.display = "block";
});

document.addEventListener("click", function (e) {
    if (!e.target.closest(".autocomplete")) {
        suggestions.style.display = "none";
    }
});