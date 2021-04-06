class Patient {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.gender = data.gender
        this.age = data.age
        this.vaccine = data.vaccine
    }

    static newPatientForm(){
        let newPatientFormDiv = document.getElementById('patient-form')
        newPatientFormDiv.innerHTML = `
        <form onsubmit="createPatient(); return false;">` + 
        patientFormFields + 
        `<input type="submit" value="Add a Patient"> 
        </form> <br/>
         `
    }
    static editPatientForm(){
        let editPatientForm = document.getElementById('patient-form')
        editPatientForm.innerHTML = `
        <form onsubmit="updatePatient(); return false;">` + 
        patientFormFields + 
        `<input type="submit" value="Edit Patient">
        </form> <br/>`
        }

}

function getPatients() {
    fetch(`http://localhost:3000/patients`)
    .then(resp => resp.json())
    .then(data => {
        renderPatientHtml(data)
        addPatientClickListeners()
        addEventsClickListeners()
    })
}

function createPatient() {
    const patient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        vaccine: document.getElementById('vaccine').value
    }

    fetch(`http://localhost:3000/patients`, {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(patient => {
        getPatients()
        Patient.newPatientForm
    });
}

 function updatePatient() {
     let patientId = this.event.target.patientId.value

     const patient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        vaccine: document.getElementById('vaccine').value
     }
     fetch(`http://localhost:3000/patients/${patientId}`, {
        method: 'PATCH',
        body: JSON.stringify(patient),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(patient => {
        getPatients()
        Patient.newPatientForm
    });
}

    function editPatient() {
        let patientId = this.parentElement.getAttribute('patient-data-id')

    }


