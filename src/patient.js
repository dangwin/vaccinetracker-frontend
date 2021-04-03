const patientFormFields = `
    <label><strong>Name: </strong></label><br/>
    <input type="text" id="name"><br/>
    <input type="hidden" id="patientId">
    <label><strong>Age:   </strong></label><br/>
    <input type="integer" id="age"><br/>  
    <label>Gender:   </strong></label><br/>
    <input type="text" id="gender"><br/>  
    <label><strong>Vaccine: </strong></label><br/>
    <input type="text" id="vaccine"><br/>`

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
        <form onsubmit="updateDog(); return false;">` + 
        patientFormFields + 
        `<input type="submit" value="Edit Patient">
        </form> <br/>`
        }

}
