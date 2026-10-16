document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = `${name} - ${email}`;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(deleteBtn);

    // Append to user list
    document.getElementById("users").appendChild(li);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
});