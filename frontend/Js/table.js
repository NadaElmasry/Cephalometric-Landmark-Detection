const baseURL = 'http://localhost:3000'
let patients = []

$("#searchKey").on("input", () => {
    searchKey = $("#searchKey").val();
    getData()
})

function getData() {

    axios({
        method: 'get',
        url: `${baseURL}/user`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).then(function (response) {
        console.log(response);
        const { message, users } = response.data
        if (message == "Done") {
            patients = users
            console.log(patients);

            showData()
        }
    }).catch(function (error) {
        console.log(error);
    });
}
getData();

function showData(e) {
    let cartonna = ``

    for (let index = 0; index < patients.length; index++) {
        console.log(e)
        let patient_identifier = patients[index].identifier;
        cartonna += `  <tr class='mt-5' id='rowData'>
          <td><img class='profile-pic' src=${patients[index].cephalometricPic}  onclick="getDataResult( ${patient_identifier})"></td>
           <td onclick="getDataResult( ${patient_identifier})"> ${patient_identifier}</td>
           <td onclick="getDataResult( ${patient_identifier})"> ${patients[index].age}</td>
           <td onclick="getDataResult( ${patient_identifier})"> ${patients[index].gender}</td>
           <td onclick="getDataResult( ${patient_identifier})"> ${patients[index].comments}</td>
           <td>${createDate(patients[index].createdAt)}</td>

           <td><button id='updateData' onclick='updateItem(${patient_identifier})' class="btn btn-sm pen-btn"><i class="fa-solid fa-pen" aria-hidden="true" class="text-white"></i></button></td>
           <td><button id='deleteData' onclick='deleteItem(${patient_identifier})' class="btn btn-sm trash-btn" id="update-btn-repo"><i class="fa fa-trash"></i></button></td>     
           </td>
          
       </tr>`

    }
    document.getElementById('tbody').innerHTML = cartonna
}
function deleteItem(id) {

    axios({
        method: 'delete',
        url: `${baseURL}/user/${id}`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then(function (response) {
        const { message } = response.data
        if (message == "Done") {
            alert("Deleted successfully")
            getData()
        } else {
            alert("Fail to Delete your product")
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function updateItem(id) {
    localStorage.setItem("patientID", id)
    window.location.replace("http://127.0.0.1:5501/upload.html");
}

function createDate(dd) {
    const date = new Date(dd);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;
    console.log(currentDate);
    return currentDate
}
function getDataResult(id) {
    localStorage.setItem("patientID", id)
    window.location.replace("http://127.0.0.1:5501/result.html");
}

