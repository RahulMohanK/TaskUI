
function getValues() {
    var postBody;
    var x = document.getElementById("Staff").selectedIndex;
    var staffType = document.getElementsByTagName("option")[x].value;

    var EmpId = document.getElementById("IEmpId").value;
    var Name = document.getElementById("IName").value;
    var Email = document.getElementById("IEmail").value;
    var Phone = document.getElementById("IPhone").value;
    var Dob = document.getElementById("IDob").value;

    if (staffType == 'admin') {
        var Designation = document.getElementById("IDesignation").value;
        postBody = JSON.stringify({
            name: Name,
            empId: EmpId,
            staffType: 0,
            email: Email,
            phone: Phone,
            dob: Dob,
            administrativeStaff: [{ designation: Designation }]
        });
    }
    else if (staffType == 'teaching') {
        var Subject = document.getElementById("ISubject").value;
        postBody = JSON.stringify({
            name: Name,
            empId: EmpId,
            staffType: 1,
            email: Email,
            phone: Phone,
            dob: Dob,
            teachingStaff: [{ subject: Subject }]
        });
    }
    else {
        var Department = document.getElementById("IDepartment").value;
        postBody = JSON.stringify({
            name: Name,
            empId: EmpId,
            staffType: 2,
            email: Email,
            phone: Phone,
            dob: Dob,
            supportingStaff: [{ department: Department }]
        });
    }
    fetch("https://localhost:8001/Staff", {

        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: postBody

    })
        .then(response => response.json())


        .then(json => console.log(json));
}

function displayStaffType() {
    var SpecificField;
    var x = document.getElementById("Staff").selectedIndex;

    var staffType = document.getElementsByTagName("option")[x].value;

    if (staffType == 'admin') {
        SpecificField = `<label id="LDesignation" >Designation :</label><br>
                        <input type="text" id="IDesignation"  /><br><br>`;

    }
    else if (staffType == 'teaching') {
        SpecificField = `<label id="LSubject" >Subject :</label><br>
                        <input type="text" id="ISubject"  /><br><br>`;

    }
    else {
        SpecificField = `<label id="LDepartment" >Department :</label><br>
                        <input type="text" id="IDepartment"  /><br><br>`;
    }
    document.getElementById("SpecificFields").innerHTML = SpecificField;
}