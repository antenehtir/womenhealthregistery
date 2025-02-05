// Toggle investigation details based on status selection
document.addEventListener("DOMContentLoaded", function () {
  const investigationStatus = document.getElementById("investigationStatus");
  const investigationDetails = document.getElementById("investigationDetails");
  const investigationNotDoneDetails = document.getElementById("investigationNotDoneDetails");

  investigationStatus.addEventListener("change", function () {
    if (this.value === "Done") {
      investigationDetails.style.display = "block";
      investigationNotDoneDetails.style.display = "none";
    } else {
      investigationDetails.style.display = "none";
      investigationNotDoneDetails.style.display = "block";
    }
  });
});

function addEntry() {
  // Gather values from the form
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const date = document.getElementById("date").value;
  const site = document.getElementById("site").value;
  const doctor = document.getElementById("doctor").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value || "N/A";
  const bloodGroup = document.getElementById("bloodGroup").value;
  const investigationStatus = document.getElementById("investigationStatus").value;

  let diagnosisOrRemark = "";
  if (investigationStatus === "Done") {
    let diagnosis = document.getElementById("diagnosis").value;
    const otherDiagnosis = document.getElementById("otherDiagnosis").value;
    if (diagnosis === "Other" && otherDiagnosis.trim() !== "") {
      diagnosis = otherDiagnosis;
    }
    diagnosisOrRemark = diagnosis;
  } else {
    diagnosisOrRemark = document.getElementById("notDoneRemark").value;
  }

  // Insert new row in the table
  const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `<td>${name}</td>
                      <td>${age}</td>
                      <td>${sex}</td>
                      <td>${date}</td>
                      <td>${site}</td>
                      <td>${doctor}</td>
                      <td>${phone}</td>
                      <td>${email}</td>
                      <td>${bloodGroup}</td>
                      <td>${investigationStatus}</td>
                      <td>${diagnosisOrRemark}</td>`;

  // Reset the form and set investigation details visibility to default
  document.getElementById("registrationForm").reset();
  document.getElementById("investigationDetails").style.display = "block";
  document.getElementById("investigationNotDoneDetails").style.display = "none";
}

function exportToExcel() {
  let table = document.getElementById("dataTable");
  let rows = [];

  // Loop through each table row and construct CSV rows
  for (let i = 0, row; (row = table.rows[i]); i++) {
    let cells = row.cells;
    let rowData = [];
    for (let j = 0, cell; (cell = cells[j]); j++) {
      rowData.push('"' + cell.innerText + '"'); // Wrap cell data in quotes
    }
    rows.push(rowData.join(","));
  }

  let csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "womens_health_data.csv");
  document.body.appendChild(link);
  link.click();
}

function resetForm() {
  document.getElementById("registrationForm").reset();
  document.getElementById("dataTable").getElementsByTagName("tbody")[0].innerHTML = "";
  // Reset investigation fields to default visibility
  document.getElementById("investigationDetails").style.display = "block";
  document.getElementById("investigationNotDoneDetails").style.display = "none";
}
