document.addEventListener("DOMContentLoaded", function () {

    const studentInput =
        document.getElementById("studentName");

    const studentSuggestions =
        document.getElementById("studentSuggestions");

    if (!studentInput || !studentSuggestions) {
        return;
    }

    function getStudentList() {

        const title =
            document.getElementById("examTitle")
            .textContent;

        const match =
            title.match(/\b([7-9])\b/);

        if (!match) {
            return [];
        }

        const gradeLevel =
            match[1];

        let students = [];

        Object.keys(window.studentDirectory || {})
            .forEach(key => {

                if (
                    key.startsWith(
                        gradeLevel + "-"
                    )
                ) {

                    students.push(
                        ...window.studentDirectory[key]
                    );

                }

            });

        return students;
    }

    function showStudentSuggestions(value = "") {

        const students =
            getStudentList();

        studentSuggestions.innerHTML = "";

        const matches =
            students.filter(name =>
                name.toLowerCase()
                    .includes(
                        value.toLowerCase()
                    )
            );

        if (matches.length === 0) {

            studentSuggestions.style.display =
                "none";

            return;
        }

        matches.forEach(name => {

            const item =
                document.createElement("div");

            item.className =
                "suggestion-item";

            item.textContent =
                name;

            item.addEventListener(
                "click",
                function () {

                    studentInput.value =
                        name;

                    studentSuggestions.style.display =
                        "none";
                }
            );

            studentSuggestions.appendChild(
                item
            );

        });

        studentSuggestions.style.display =
            "block";
    }



    studentInput.addEventListener(
        "input",
        function () {
            showStudentSuggestions(
                this.value
            );
        }
    );

    document.addEventListener(
        "click",
        function (e) {

            if (
                !e.target.closest(
                    ".autocomplete"
                )
            ) {

                studentSuggestions.style.display =
                    "none";
            }

        }
    );

});