var selectedRow = null;

// Show alert
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;  // Corrected className
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    // Auto-remove alert after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear form fields
function clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#roll").value = "";
    document.querySelector("#department").value = "";
    document.querySelector("#sub").value = "";x
}

// Form submission event listener
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent page reload on form submission

    const name = document.querySelector("#name").value.trim();
    const roll = document.querySelector("#roll").value.trim();
    const department = document.querySelector("#department").value.trim();
    const sub = document.querySelector("#sub").value.trim();

    // Form validation
    if (name === "" || roll === "" || department === "" || sub === "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow === null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${name}</td>
                <td>${roll}</td>
                <td>${department}</td>
                <td>${sub}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student added", "success");
        } else {
            // Update existing row
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = roll;
            selectedRow.children[2].textContent = department;
            selectedRow.children[3].textContent = sub;
            showAlert("Student info edited", "info");
        }

        // Clear fields after submission or edit
        clearFields();
        selectedRow = null;
    }
});

// Event delegation for edit and delete buttons
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#roll").value = selectedRow.children[1].textContent;
        document.querySelector("#department").value = selectedRow.children[2].textContent;
        document.querySelector("#sub").value = selectedRow.children[3].textContent;
    }

    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Student data deleted", "danger");
    }
});
