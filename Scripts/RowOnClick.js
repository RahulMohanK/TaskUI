var modal = document.getElementById('staffModal');
let EmpId;
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function highlight_row() {
    var table = document.getElementById('staffTable');
    var cells = table.getElementsByTagName('td');
    console.log(cells.length);
    for (var i = 0; i < cells.length; i++) {

        var cell = cells[i];

        cell.onclick = function () {

            var rowId = this.parentNode.rowIndex;

            var rowSelected = table.getElementsByTagName('tr')[rowId];

            EmpId = rowSelected.cells[1].innerHTML;
            msg = 'Emp Id : ' + EmpId;
            //alert(msg);
            displayContent(EmpId);

        }
    }
}
function displayContent(EmpId) {
    document.getElementById('staffModal').style.display = 'block';
    document.getElementById('modalpara').innerHTML = "Employee Id : " + EmpId;
    deleteContent();
    editContent();

}
function deleteContent() {
    console.log(EmpId);

    var el = document.getElementById('btndelete')
    clickerFn = function () {
        DeleteStaff(EmpId);
        console.log('Click just happened');
        document.getElementById('staffModal').style.display = 'none';


    }

    el.addEventListener('click', clickerFn);
}

function editContent() {
    var el = document.getElementById('btncancel');
    clickerFn = function () {
        window.location.href = "file:///C:/Users/Workstation/Desktop/StaffUI/register.html?empId=" + EmpId;

        console.log('Click just happened');
        document.getElementById('staffModal').style.display = 'none';


    }

    el.addEventListener('click', clickerFn);
}
