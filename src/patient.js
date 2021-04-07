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
        <form>` + 
        `<input type="submit" value="Add a Patient"> 
        </form> <br/>
         `
         newPatientFormDiv.addEventListener("submit", function(e){
            console.log(e)
            e.preventDefault()
         })
    }
    static editPatientForm(){
        let editPatientForm = document.getElementById('patient-form')
        editPatientForm.innerHTML = `
        <form onsubmit="updatePatient(); return false;">` + 
        `<input type="submit" value="Edit Patient">
        </form> <br/>`
        }

    render(el){
        el.innerHTML= `
        <tr>
             <td> ${this.id}</td> 
             <td> ${this.name}</td> 
             <td> ${this.gender}</td>
             <td> ${this.age}</td> 
             <td> ${this.vaccine}</td>
        </tr>`
    }

    static fromForm (){
        return new Patient  ({
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            vaccine: document.getElementById('vaccine').value
        })
    }
    

}

function getPatients() {
    fetch(`http://localhost:3000/patients`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        renderPatientHtml(data)
        // addPatientClickListeners()
    })
}

function renderPatientHtml(data){
    const table = document.getElementById('patients')
    table.innerHTML=""
    data.forEach(function(patient){
        const p = new Patient(patient)
        const tr = document.createElement('tr')
        p.render(tr)
        table.append(tr)
    })
}

function createPatient() {
    console.log("createPatient")
    const patient = Patient.fromForm()
    fetch(`http://localhost:3000/patients`, {
        method: 'POST',
        body: JSON.stringify({patient}),
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
     const patient = Patient.fromForm()

     fetch(`http://localhost:3000/patients/${patientId}`, {
        method: 'PATCH',
        body: JSON.stringify({patient}),
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
        fetch(`http://localhost:3000/patients/${patientId}`)
        .then(resp => resp.json())
        .then(data => {
            Patient.editPatientForm()
            let patientForm = document.getElementById('patient-form')
            patientForm.querySelector('#name').value = data.name
            patientForm.querySelector('#age').value = data.age
            patientForm.querySelector('#gender').value = data.gender
            patientForm.querySelector('#vaccine').value = data.vaccine
    })
}

    function deletePatient() {
        let patientId = this.parentElement.getAttribute('patient-data-id')
        fetch(`http://localhost:3000/patients/${patientId}`, {
            method: `DELETE`
        })
        .then(resp => resp.json())
        .then(json => {
            let selectedPatient = document.querySelector(`.card[patient-data-id="${patientId}"]`)
            selectedPatient.remove()
        })
    }




