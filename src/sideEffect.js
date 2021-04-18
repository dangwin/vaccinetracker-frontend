class SideEffect {
    constructor(data){
        this.patient_id = data.patient_id
        this.side_effect = data.side_effect
    }
}

function renderSideEffects(data){
    const table = document.querySelector('#sideeffects');
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');
    let groupedData= [];
    data.map(el=>{
      let existing =  groupedData.find(item => item.name === el.patient.name);
    if(existing) {
        existing.sideEffects.push(el.side_effect);
    } else {
        groupedData.push({ name: el.patient.name, sideEffects: [el.side_effect]});
    }
      
    });
    groupedData.forEach(el=> {
        tbody.insertAdjacentHTML(
            'afterbegin',
            ` 
                <tr>
                    <td>${el.name}</td>
                    <td> ${el.sideEffects.join(', ')}</td> 
                    <button class="delete-patient-button" patient-data-id="${this.id}">Delete Patient</button></td>
                </tr>
                <button class="delete-sideeffect-button" sideeffect-data-id="${this.id}">Delete Patient</button></td>
                `);
    });

        thead.insertAdjacentHTML('beforebegin', `
        
            <th><u>Name</u></th>
            <th><u>Side Effect</u></th>
        `)

    
}

function getSideEffects() {
    fetch(`http://localhost:3000/side_effects`)
    .then(resp => resp.json())
    .then(data => {
        renderSideEffects(data)
    })
}

function createSideFffect(patientId) {
  const formWrapper = document.getElementById("myForm");
  formWrapper.style.display = "block";

  const form = formWrapper.querySelector('form');
  form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      const sideEffect = form.querySelector('input').value;

      fetch('http://localhost:3000/side_effects', {
          method: 'POST',
          body: JSON.stringify({ sideEffect, patientId }),
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).then(resp => resp.json()).then(data=> console.log(data)).catch(err=> console.error(err));

      closeForm();
    });
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function sideEffectListeners() {

    document.querySelectorAll('.show-side-effect-button').forEach(e => {
        e.addEventListener("click",getSideEffects);
    })
}
