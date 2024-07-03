let hdgs = ['Name', 'Age', 'IsMember?'];
let rows = [
    { firstName: 'Tom', age: 12, member: true },
    { firstName: 'Dick', age: 22, member: true },
    { firstName: 'Harriet', age: 14, member: false },
    { firstName: 'Jane', age: 34, member: true },
];

getF1Data();

function getF1Data() {
    fetch('https://api.openf1.org/v1/drivers?session_key=latest')
        .then(response => response.json())
        .then(jsonContent => {
            console.log(jsonContent);

            rows = jsonContent.map(d => {
                return {
                    number: d.driver_number,
                    fullName: d.full_name,
                    img: d.headshot_url,
                    team: d.team_name,
                    country: d.country_code
                };
            });

            hdgs = [
                'Number',
                'Name',
                'Image',
                'Team',
                'Country'
            ];

            buildTable();

        });
}



function buildTable() {
    const table = getEl('myTable');

    const thead = createEl('thead');
    const tbody = createEl('tbody');


    // populate heading section
    const hdgRow = createEl('tr');
    let hdgCell;
    for (let hdg of hdgs) {
        hdgCell = createEl('th');
        hdgCell.textContent = hdg;
        hdgRow.appendChild(hdgCell);
    }

    thead.appendChild(hdgRow);
    table.appendChild(thead);


    // populate rows body section of table
    let dataRow, dataCell;
    for (let row of rows) {
        dataRow = createEl('tr');

        for (let fld in row) {
            dataCell = createEl('td');

            if (fld === 'img') {
                let image = createEl('img');
                image.src = row[fld];
                dataCell.appendChild(image);
            } else {                
                dataCell.textContent = row[fld];  //row.firstName etc.

            }
            dataRow.appendChild(dataCell);
        }

        tbody.appendChild(dataRow);

    }

    table.appendChild(tbody);

}



function getEl(elId) {
    return document.getElementById(elId);
}

function createEl(el) {
    return document.createElement(el);
}


