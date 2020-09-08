var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("=");
var editStaffType = queries[1];
if (queries[0] == 'staffType') {
    console.log("edit" + editStaffType);
}
var url;
getHeading();
async function getData(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });

    return response.json();
}

function showData(result, staffType) {
    let counter = 0;
    for (let i = 0; i < result.length; i++) {

        var table = document.getElementById("staffTable");
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        cell1.innerHTML = ++counter;
        cell2.innerHTML = result[i].empId;
        cell3.innerHTML = result[i].name;
        cell4.innerHTML = result[i].phone == null ? 'not provided' : result[i].phone;
        cell5.innerHTML = result[i].email == null ? 'not provided' : result[i].email;
        cell6.innerHTML = result[i].dob == null ? 'not provided' : result[i].dob;
        if (staffType == 'admin') {
            cell7.innerHTML = result[i].administrativeStaff[0].designation;
        }
        else if (staffType == 'teaching') {
            cell7.innerHTML = result[i].teachingStaff[0].subject;
        }
        else {
            cell7.innerHTML = result[i].supportingStaff[0].department;
        }

    }
    highlight_row();
}

function getHeading() {
    let heading;
    let showType;
    var staffHeading = document.getElementById('staffHeading');
    var x = document.getElementById("Staff").selectedIndex;
    var staffType = document.getElementsByTagName("option")[x].value
    console.log(staffType);
    if (staffType == "admin") {
        showType = 'admin';
        staffHeading.innerHTML = 'Administrative Staff';
        heading = `<tr>
                <th>Sl.No</th>
                <th>EmpId</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>                        
                <th>Dob</th>
                <th>Designation</th>
            </tr>`;
        url = 'admin';
    }
    else if (staffType == "teaching") {
        showType = 'teaching';
        staffHeading.innerHTML = 'Teaching Staff';
        heading = `<tr>
                <th>Sl.No</th>
                <th>EmpId</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Dob</th>
                <th>Subject</th>
            </tr>`;
        url = 'teaching';
    }
    else {
        showType = 'support';
        staffHeading.innerHTML = 'Supporting Staff';
        heading = `<tr>
                <th>Sl.No</th>
                <th>EmpId</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>      
                <th>Dob</th>
                <th>Department</th>
            </tr>`;
        url = 'support';
    }

    document.getElementById("staffTable").innerHTML = heading;
    getData('https://localhost:8001/Staff/?type=' + url)
        .then(data => {
            console.log(data);
            showData(data, showType);
        });

}

