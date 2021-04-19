class SideEffect {
    constructor(data){
        this.patient_id = data.patient_id
        this.side_effect = data.side_effect
    }
}

function renderSideEffects(data){
    const table = document.querySelector('#sideeffects');
    table.style.display ='block';
    const tbody = table.querySelector('tbody');
    const thead = table.querySelector('thead');
    tbody.innerHTML = '';

    let groupedData= [];
    data.map(el=>{
      let existing =  groupedData.find(item => item.name === el.patient.name);
    if(existing) {
        existing.sideEffects.push({
          id: el.id,
         sideEffect: el.side_effect,
         patientId: el.patient_id
        });
    } else {
        groupedData.push({ name: el.patient.name, sideEffects: [{
            id: el.id,
             sideEffect: el.side_effect,
             patientId: el.patient_id}]});
    }
      
    });
    groupedData.forEach(el=> {
        resultingStr = ` 
        <tr>
            <td>${el.name}</td>
            <td><ul>`
        el.sideEffects.forEach(eff=> {
            resultingStr += `
              <li sideEffectId="${eff.id}">
                <span>${eff.sideEffect}</span>
                <button class="sideeffect-button" onclick='createSideEffect(${eff.id}, \"${eff.sideEffect}\", ${eff.patientId})'>Edit</button>
                <button onclick='deleteSideEffect(${eff.id})'>Delete</button></li>`;
        });
        resultingStr += '</ul></td></tr>';
        tbody.insertAdjacentHTML(
            'afterbegin',
            resultingStr);
    });
}

function getSideEffects() {
    fetch(`http://localhost:3000/side_effects`)
    .then(resp => resp.json())
    .then(data => {
        renderSideEffects(data)
    })
}

function createSideEffect(sideEffectId, sideEffect, patientId) {
  const formWrapper = document.getElementById("myForm");
  formWrapper.style.display = "block";

  const form = formWrapper.querySelector('form');
  if (sideEffectId){
    const sideEffectInput = form.querySelector('input');
    sideEffectInput.value = sideEffect;
  }
  form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      const sideEffectInput = form.querySelector('input');
      const sideEffectName = sideEffectInput.value;

      if(sideEffectId) {
        fetch(`http://localhost:3000/side_effects/${sideEffectId}`, {
            method: 'PATCH',
            body: JSON.stringify({ sideEffect: sideEffectName }),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).
      then(resp => resp.json()).
      then(data=> {
          document.getElementById("sideeffects").style.display = "none";
      }).
      catch(err=> console.error(err));
      } else {
        fetch('http://localhost:3000/side_effects', {
            method: 'POST',
            body: JSON.stringify({ sideEffect: sideEffectName, patientId }),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(resp => resp.json()).then(data=> console.log(data)).catch(err=> console.error(err));
    }

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

function deleteSideEffect(id) {
    if (confirm('Are you sure you want to delete?')) {
    fetch(`http://localhost:3000/side_effects/${id}`, {
        method: `DELETE`
    })
    .then(resp => resp.json())
    .then(json => {
        const sideEffectLi = document.querySelector(`li[sideEffectId="${id}"]`);
        sideEffectLi.remove();
    });
    }
}
