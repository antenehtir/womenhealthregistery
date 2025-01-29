function addEntry() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const date = document.getElementById('date').value;
    const site = document.getElementById('site').value;
    const doctor = document.getElementById('doctor').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    let diagnosis = document.getElementById('diagnosis').value;
    const otherDiagnosis = document.getElementById('otherDiagnosis').value;

    if (diagnosis === "Other" && otherDiagnosis.trim() !== "") {
        diagnosis = otherDiagnosis;
    }

    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${name}</td>
                        <td>${age}</td>
                        <td>${sex}</td>
                        <td>${date}</td>
                        <td>${site}</td>
                        <td>${doctor}</td>
                        <td>${phone}</td>
                        <td>${email}</td>
                        <td>${diagnosis}</td>`;

    document.getElementById('registrationForm').reset();
}

function exportToExcel() {
    let table = document.getElementById("dataTable");
    let rows = [];

    for (let i = 0, row; row = table.rows[i]; i++) {
        let cells = row.cells;
        let rowData = [];
        for (let j = 0, cell; cell = cells[j]; j++) {
            rowData.push(cell.innerText);
        }
        rows.push(rowData);
    }

    let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "womens_health_data.csv");
    document.body.appendChild(link);
    link.click();
}
