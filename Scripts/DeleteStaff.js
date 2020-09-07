
function DeleteStaff(EmpId) {
    fetch("https://localhost:8001/Staff/" + EmpId, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));
}
