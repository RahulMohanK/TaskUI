var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("=");
var EmpId = queries[1];
if (queries[0] == 'empId') {
    EditStaffValues();
    document.getElementById("hReg").innerHTML = "EDIT STAFF";
    document.getElementById('registerSubmit').style.visibility = 'hidden';
    document.getElementById('registerEdit').style.visibility = 'visible';
    document.getElementById("IEmpId").readOnly = true;
    document.getElementById("btndisplay").disabled = true;
    document.getElementById("Staff").disabled = true;

}

var modal = document.getElementById('notification');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        redirectToTable();
    }
}

async function getData(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });

    return response.json();
}
function showData(result) {
    document.getElementById("IEmpId").value = result.empId == undefined ? "" : result.empId;
    document.getElementById("IName").value = result.name == undefined ? "" : result.name;
    document.getElementById("IEmail").value = result.email == undefined ? "" : result.email;
    document.getElementById("IPhone").value = result.phone == undefined ? "" : result.phone;
    document.getElementById("IDob").value = result.dob == undefined ? "" : result.dob;
    if (result.staffType == 2) {
        document.getElementById('Staff').value = 'support';
        document.getElementById('btndisplay').onclick = displayStaffType();
        document.getElementById("IDepartment").value = result.supportingStaff[0].department == undefined ? "" : result.supportingStaff[0].department;
    }
    else if (result.staffType == 1) {
        document.getElementById('Staff').value = 'teaching';
        document.getElementById('btndisplay').onclick = displayStaffType();
        document.getElementById("ISubject").value = result.teachingStaff[0].subject == undefined ? "" : result.teachingStaff[0].subject;
    }
    else {
        document.getElementById('Staff').value = 'admin';
        document.getElementById('btndisplay').onclick = displayStaffType();
        document.getElementById("IDesignation").value = result.administrativeStaff[0].designation == undefined ? "" : result.administrativeStaff[0].designation;
    }


}
function EditStaffValues() {

    getData("https://localhost:8001/Staff/" + EmpId)
        .then(data => {
            console.log(data);
            showData(data);
        });

}
var staffType;
function EditStaff() {
    var postBody;
    var x = document.getElementById("Staff").selectedIndex;
    staffType = document.getElementsByTagName("option")[x].value;
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
    fetch("https://localhost:8001/Staff/" + EmpId, {

        method: 'PUT',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: postBody

    })
        .then(response => response.json())


        .then(json => console.log(json))
        .then(notify());


}
function notify() {
    document.getElementById('notification-heading').innerHTML = "Edit Successfull";
    document.getElementById('notification').style.display = 'block';

}
function redirectToTable() {
    document.getElementById('notification').style.display = 'none'
    window.location.href = " file:///C:/Users/Workstation/Desktop/StaffUI/home.html";

}