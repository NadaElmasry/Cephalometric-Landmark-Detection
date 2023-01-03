const baseURL = 'http://localhost:3000'
const patientID = localStorage.getItem('patientID')
let patient = {};


function getpatient() {
  console.log('getpatient')
  axios({
    method: 'get',
    url: `${baseURL}/user/info/${localStorage.getItem('patientID')}`,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  }).then(function (response) {
    const { message, user } = response.data;
    patient = user;

    showPatient();
    console.log(user);

  }).catch(function (error) {
    console.log(error);
  });
}

function showPatient() {


  let cartonna = ` 

           <table class=" table table-striped">
           <thead>
             <th>Identifier</th>
             
           </thead>
           <tbody>
             <tr>
             <td id='identifier_result'>${patient.identifier}</td>
             </tr>                 
           </tbody>
         </table>

         <table class=" table table-striped">
           <thead>
             <th>Gender</th>
             
           </thead>
           <tbody>
             <tr>
             <td id='age_result'>${patient.age}</td>
             </tr>                 
           </tbody>
         </table>


         <table class=" table table-striped">
           <thead>
             <th>Gender</th>
             
           </thead>
           <tbody>
             <tr>
             <td id='gender_result'>${patient.gender}</td>
             </tr>                 
           </tbody>
         </table>


         <table class=" table table-striped">
           <thead>
             <th>Comments</th>
             
           </thead>
           <tbody>
             <tr>
             <td id='comments_result'>${patient.comments}</td>
             </tr>                 
           </tbody>
         </table>


         <table class=" table table-striped">
           <thead>
             <th>Date</th>
             
           </thead>
           <tbody>
             <tr>
             <td id='date_result'>${createDate(patient.createdAt)}</td>
             </tr>                 
           </tbody>
         </table>
          
       </tr>`
  $('.result_img').attr('src', `${patient.perdictedpic}`);
  $('#plugin-result-img').attr('href', `${patient.perdictedpic}`);

  $(".result_container").append(cartonna);
  localStorage.removeItem('patientID')
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

getpatient();


$("#generate_Pdf_btn").click(() => {
  generatePDF(patient);
})


function generatePDF(patientData) {

  var element = document.getElementById('divToExport');

  var opt = {
    margin: 0.5,
    filename: 'myfile.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait', precision: '12' }
  };

  html2pdf().set(opt).from(element).save();;
  let cartonna = `<img src="${patientData.perdictedpic}" alt="" class="w-50 mb-4" id="patientAnalyzedImg">`
  $("#divToExport").append(cartonna);
  console.log(patientData.perdictedpic)

}

