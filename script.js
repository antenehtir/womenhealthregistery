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
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value || "N/A";
  const bloodGroup = document.getElementById("bloodGroup").value;
  const date = document.getElementById("date").value;
  const site = document.getElementById("site").value;
  const doctor = document.getElementById("doctor").value;
  const invStatus = document.getElementById("investigationStatus").value;

  let diagnosisOrRemark = "";
  if (invStatus === "Done") {
    let diagnosis = document.getElementById("diagnosis").value;
    const otherDiagnosis = document.getElementById("otherDiagnosis").value;
    if (diagnosis === "Other" && otherDiagnosis.trim() !== "") {
      diagnosis = otherDiagnosis;
    }
    diagnosisOrRemark = diagnosis;
  } else {
    diagnosisOrRemark = document.getElementById("notDoneRemark").value;
  }

  // Insert new row in the table with the corrected order:
  // Name, Age, Sex, Phone, Email, Blood Group, Date, Campaign Site, Doctor's Name, Investigation Status, Diagnosis/Remark
  const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `<td>${name}</td>
                      <td>${age}</td>
                      <td>${sex}</td>
                      <td>${phone}</td>
                      <td>${email}</td>
                      <td>${bloodGroup}</td>
                      <td>${date}</td>
                      <td>${site}</td>
                      <td>${doctor}</td>
                      <td>${invStatus}</td>
                      <td>${diagnosisOrRemark}</td>`;

  // Save common field values (date, campaign site, doctor's name)
  const savedDate = date;
  const savedSite = site;
  const savedDoctor = doctor;

  // Reset only the patient-specific and investigation fields
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("sex").selectedIndex = 0;
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("bloodGroup").selectedIndex = 0;
  document.getElementById("investigationStatus").selectedIndex = 0;
  document.getElementById("investigationDetails").style.display = "block";
  document.getElementById("investigationNotDoneDetails").style.display = "none";
  document.getElementById("diagnosis").selectedIndex = 0;
  document.getElementById("otherDiagnosis").value = "";
  document.getElementById("notDoneRemark").value = "";

  // Restore common fields
  document.getElementById("date").value = savedDate;
  document.getElementById("site").value = savedSite;
  document.getElementById("doctor").value = savedDoctor;
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
  // Clear entire form and table
  document.getElementById("registrationForm").reset();
  document.getElementById("dataTable").getElementsByTagName("tbody")[0].innerHTML = "";
  // Reset investigation details to default visibility
  document.getElementById("investigationDetails").style.display = "block";
  document.getElementById("investigationNotDoneDetails").style.display = "none";
}
