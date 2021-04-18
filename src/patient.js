class Patient {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.gender = data.gender
        this.age = data.age
        this.vaccine = data.vaccine
    }

    render(el){
        el.innerHTML= `
        <tr>
             <td> ${this.name}</td> 
             <td> ${this.gender}</td>
             <td> ${this.age}</td> 
             <td> ${this.vaccine}</td>
        </tr>
        <button class="add-side-effect-button" patient_id="${this.id}" onclick="createSideFffect(${this.id})">Add Side Effect</button> 
        <button class="edit-patient-button" patient-data-id="${this.id}">Edit Info</button> 
        <button class="delete-patient-button" patient-data-id="${this.id}">Delete Patient</button>`
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
        patientListeners()
    })
    
}

function renderPatientHtml(data){
    const table = document.getElementById('patients')
    table.innerHTML=`<tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Vaccine</th>
                    </tr>`
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
        resetForm()
        patientListeners()
    });
}

function resetForm(){
    document.getElementById('patient-form').reset();
}

 function updatePatient(e) {
    let patientId = document.getElementById('patient-id').value;
    const patient = Patient.fromForm()
     fetch(`http://localhost:3000/patients/${patientId}`, {
        method: 'PATCH',
        body: JSON.stringify({patient}),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    .then(resp => resp.json() )
    .then(patient => {
        getPatients()
        resetForm()
    });
}

    function editPatient(e) {
        let patientId = this.getAttribute('patient-data-id')
        fetch(`http://localhost:3000/patients/${patientId}`)
        .then(resp => resp.json())
        .then(data => {
            let patientForm = document.getElementById('patient-form')
            patientForm.querySelector('#name').value = data.name
            patientForm.querySelector('#age').value = data.age
            patientForm.querySelector('#gender').value = data.gender
            patientForm.querySelector('#vaccine').value = data.vaccine
            patientForm.querySelector('#patient-id').value = patientId;
    })

}


    function deletePatient() {
        let patientId = this.getAttribute('patient-data-id')
        fetch(`http://localhost:3000/patients/${patientId}`, {
            method: `DELETE`
        })
        .then(resp => resp.json())
        .then(json => {
            let selectedPatient = document.getElementById('patient-id').value
            selectedPatient.remove()
        })
        resets();
    }

    function patientListeners() {

        document.querySelectorAll('.edit-patient-button').forEach(e => {
            e.addEventListener("click", editPatient);
            
        })

        document.querySelectorAll('.delete-patient-button').forEach(e => {
            e.addEventListener("click", deletePatient);
        })

        document.querySelectorAll('.edit-button').forEach(e => {
            e.addEventListener("click", updatePatient);
        })    
        
        document.querySelectorAll('.submit-button').forEach(e => {
            e.addEventListener("click", createPatient);
        })
    }

    function resets(){
        location.reload();
    }

