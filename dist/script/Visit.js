import Modal from "./Modal.js";
import { getData, deleteData, postData, putData } from "./requestFuntion.js";
import {arrData} from "./script.js"
import {checkVisitTable} from "./script.js"

let idCard = '';


export class Visit {
  constructor(id, doctor, reason, description, urgency, name, lastName, date, time) {
    this.doctor = doctor;
    this.reason = reason;
    this.description = description;
    this.name = name;
    this.lastName = lastName;
    this.urgency = urgency;
    this.id = id;
    this.date = date;
    this.time = time;
    this.status = getStatus(this.date, this.time);
    this.visitContainer = document.createElement('div');
  }



  renderVisit() {
    this.visitContainer.id = this.id;
    this.visitContainer.classList.add('visit-card');
    this.visitContainer.innerHTML = `
    <div class="visit-container" >
        <p class="visit-content-box__urgenest" style="background-color: blue;">${this.urgency} priority</p>
        <div class="visit-content-box">
            <button class="visit-content-box__button-block--close"><svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg"
                    viewBox="0 0 16 16">
                    <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z">
                    </path>
                </svg></button>
                <span> ${this.date}</span><span> ${this.time}</span>
                <p class="visit-content-box__status"> Status: ${this.status} </p>
                <p class="visit-content-box__name">Client:  ${this.name} ${this.lastName}</p>
                <p class="visit-content-box__doctor">Doctor:  ${this.doctor}</p>
                <div class="visit-content-box__more-info-block">
                    <p class="visit-content-box__reason">Reason of visit:  ${this.reason} </p>
                    <p class="visit-content-box__description">Short description: ${this.description} </p>
                    <p class="visit-content-box__last-visit"></p>
                </div>

            <div class="visit-content-box__button-block">
                <button class="visit-content-box__button-block--more">More</button>
                <button class="visit-content-box__button-block--edit">Edit card</button></div>
            </div>
    </div>`;
    

   

    //кнопка, яка відкриває додаткову інфу в картці
    this.visitContainer.addEventListener('click', function (event) {
      if (event.target.closest(".visit-content-box__button-block--more")) {

        this.querySelector('.visit-content-box__more-info-block').classList.toggle('.open');

        if (this.querySelector('.visit-content-box__more-info-block').classList.contains('.open')) {
          this.querySelector('.visit-content-box__button-block--more').innerText = 'Fold';
          this.querySelector('.visit-content-box__more-info-block').style.display = 'block'
        } else {
          this.querySelector('.visit-content-box__button-block--more').innerText = 'More';
          this.querySelector('.visit-content-box__more-info-block').style.display = 'none';
        }
      }
    })

    const doc = this.doctor;
    //видалення картки, відправляє делейт запит по номеру айді
    this.visitContainer.addEventListener('click', async function (event) {
      if (event.target.closest('.visit-content-box__button-block--close')) {

       deleteData(this.id);

        this.remove();
        checkVisitTable()
      }

    })

    const dataVisit = {
      dateVisit: this.date,
      timeVisit: this.time,
      doctorVisit: this.doctor,
      reasonVisit: this.reason,
      descVisit: this.description,
      nameVisit: this.name,
      lastNameVisit: this.lastName,
      urgencyVisit: this.urgency,
      idVisit: this.id,
      lastVisitV: this.lastVisit,
      presure: this.presure,
      massIndex: this.massIndex,
      diseasesCardiovascularSystem: this.diseasesCardiovascularSystem,
      age: this.age,
    }

    //вносить правки до карток
    this.visitContainer.querySelector('.visit-content-box__button-block--edit').addEventListener('click', function (event) {
      if (event.target.closest('button')) {
        idCard = dataVisit.idVisit
        if (dataVisit.doctorVisit === "cardiologist") {
          new Modal().renderModal();
          setTimeout(() => {
            document.querySelector('.modal-window').classList.add('open-popup');
        }, 0);
          document.querySelector('.modal-window').id = dataVisit.idVisit;
          document.querySelector('.modal-window__select').value = dataVisit.doctorVisit;
          document.querySelector(".modal-window__main-visit-info").style.display = "block";
          document.querySelector(".modal-window__additional-info").style.display = "block";
          document.querySelector(".modal-window").style.height = "95%";
          document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
          document.querySelector('.modal-window__submit-block--confirm').setAttribute("data-edit", "edited")
          document.querySelector('.modal-window__date').value = dataVisit.dateVisit
          document.querySelector('.modal-window__time').value = dataVisit.timeVisit;
          document.querySelector('.modal-window__main-visit-info--reason').value = dataVisit.reasonVisit;
          document.querySelector('.modal-window__main-visit-info--description').value = dataVisit.descVisit;
          document.querySelector('.modal-window__main-visit-info--urgency-visit').value = dataVisit.urgencyVisit;
          document.querySelector('.modal-window__main-visit-info--client-name').value = dataVisit.nameVisit;
          document.querySelector('.modal-window__main-visit-info--client-last-name').value = dataVisit.lastNameVisit;
          document.querySelector('.modal-window__additional-info').innerHTML = '';
          document.querySelector(".modal-window__additional-info").insertAdjacentHTML('beforebegin', `


          <div class="input-box-modal">
          <label for="">Enter normal presure</label>
          <input  value="${dataVisit.presure}" type="number" class="item">
          </div>
      
          <div class="input-box-modal">
          <label for="">Enter body mass index</label>
          <input value="${dataVisit.massIndex}"  type="number" class="item">
          </div>
      
          <div class="input-box-modal">
          <label for="">Enter diseases of the cardiovascular system</label>
          <input value="${dataVisit.diseasesCardiovascularSystem}" type="text" class="item">
          </div>
      
          <div class="input-box-modal">
          <label for="">Enter age</label>
          <input value="${dataVisit.age}" type="number" class="item">
          </div>

          <div class="error-block">
                  <p class="error-block__message">Not all fields are filled. </p>
                  <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
                  </div>   
          `)

          document.querySelector('.modal-background').addEventListener('click', function (event) {
            if (event.target.closest('div')) {
                document.querySelector('.modal-background').remove();
                document.querySelector(".modal-window").remove();
    
            }
        })

        } else if (dataVisit.doctorVisit === "dentist") {
          new Modal().renderModal();
          setTimeout(() => {
            document.querySelector('.modal-window').classList.add('open-popup');
        }, 0);
          document.querySelector('.modal-window').id = dataVisit.idVisit;
          document.querySelector('.modal-window__select').value = dataVisit.doctorVisit;
          document.querySelector(".modal-window__main-visit-info").style.display = "block";
          document.querySelector(".modal-window__additional-info").style.display = "block";
          document.querySelector(".modal-window").style.height = "75%";
          document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
          document.querySelector('.modal-window__submit-block--confirm').setAttribute("data-edit", "edited")
          document.querySelector('.modal-window__date').value = dataVisit.dateVisit
          document.querySelector('.modal-window__time').value = dataVisit.timeVisit;
          document.querySelector('.modal-window__main-visit-info--reason').value = dataVisit.reasonVisit;
          document.querySelector('.modal-window__main-visit-info--description').value = dataVisit.descVisit;
          document.querySelector('.modal-window__main-visit-info--urgency-visit').value = dataVisit.urgencyVisit;
          document.querySelector('.modal-window__main-visit-info--client-name').value = dataVisit.nameVisit;
          document.querySelector('.modal-window__main-visit-info--client-last-name').value = dataVisit.lastNameVisit;
          document.querySelector('.modal-window__additional-info').innerHTML = '';

          document.querySelector(".modal-window__additional-info").insertAdjacentHTML('beforebegin', `
          <div class="input-box-modal">
          <label for=""> Enter date of visit </label>
          <input value="${dataVisit.lastVisitV}"  class="modal-window__date item" type="date" class="item">
                </div>
      
          <div class="error-block">
                  <p class="error-block__message">Not all fields are filled. </p>
                  <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
                  </div>   
          `);
          document.querySelector('.modal-background').addEventListener('click', function (event) {
            if (event.target.closest('div')) {
                document.querySelector('.modal-background').remove();
                document.querySelector(".modal-window").remove();
    
            }
        })
        } else if (dataVisit.doctorVisit === "therapist") {
          new Modal().renderModal();
          setTimeout(() => {
            document.querySelector('.modal-window').classList.add('open-popup');
        }, 0);
          document.querySelector('.modal-window').id = dataVisit.idVisit;
          document.querySelector('.modal-window__select').value = dataVisit.doctorVisit;
          document.querySelector(".modal-window__main-visit-info").style.display = "block";
          document.querySelector(".modal-window__additional-info").style.display = "block";
          document.querySelector(".modal-window").style.height = "75%";
          document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
          document.querySelector('.modal-window__submit-block--confirm').setAttribute("data-edit", "edited")
          document.querySelector('.modal-window__date').value = dataVisit.dateVisit
          document.querySelector('.modal-window__time').value = dataVisit.timeVisit;
          document.querySelector('.modal-window__main-visit-info--reason').value = dataVisit.reasonVisit;
          document.querySelector('.modal-window__main-visit-info--description').value = dataVisit.descVisit;
          document.querySelector('.modal-window__main-visit-info--urgency-visit').value = dataVisit.urgencyVisit;
          document.querySelector('.modal-window__main-visit-info--client-name').value = dataVisit.nameVisit;
          document.querySelector('.modal-window__main-visit-info--client-last-name').value = dataVisit.lastNameVisit;
          document.querySelector('.modal-window__additional-info').innerHTML = '';
          document.querySelector(".modal-window__additional-info").insertAdjacentHTML('beforebegin', `    
          <div class="input-box-modal">
          <label for="">Enter age</label>
          <input value="${dataVisit.age}" type="number" class="item">
          </div>

          <div class="error-block">
                  <p class="error-block__message">Not all fields are filled. </p>
                  <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
                  </div>   
          `)          
          
          
          document.querySelector('.modal-background').addEventListener('click', function (event) {
            if (event.target.closest('div')) {
                document.querySelector('.modal-background').remove();
                document.querySelector(".modal-window").remove();
    
            }
        })
        } else {
          document.querySelector(".modal-window__main-visit-info").innerHTML = "";
          document.querySelector(".modal-window__additional-info").innerHTML = "";
          document.querySelector(".modal-window").style.height = "35%";
        }
      }
    });

    //тут ми встановлюємо колір шапки картки в залежності від обраного селекта
    if (this.urgency === "high") {
      this.visitContainer.querySelector('.visit-content-box__urgenest').style.backgroundColor = "red";
    } else if (this.urgency === "normal") {
      this.visitContainer.querySelector('.visit-content-box__urgenest').style.backgroundColor = "blue";
    } else if (this.urgency === "low") {
      this.visitContainer.querySelector('.visit-content-box__urgenest').style.backgroundColor = "green";

      document.querySelector('.visit-table').append(this.visitContainer);
    }
  }
}





export class VisitDentist extends Visit {
  constructor(id, doctor, reason, description, urgency, name, lastName, date, time, lastVisit) {
    super(doctor, reason, description, urgency, name, lastName, id, date, time);
    this.lastVisit = lastVisit;
  }
  renderDentist() {
    super.renderVisit();
    this.visitContainer.querySelector('.visit-content-box__more-info-block').insertAdjacentHTML('beforeEnd', `<p>Last visit to dentist: ${this.lastVisit}</p>`);
    document.querySelector('.visit-table').append(this.visitContainer);
  }
}

export class VisitCardiologist extends Visit {
  constructor(id, doctor, reason, description, urgency, name, lastName, presure, massIndex, diseasesCardiovascularSystem, age, date, time) {
    super(doctor, reason, description, name, lastName, urgency, id, date, time);
    this.presure = presure;
    this.massIndex = massIndex;
    this.diseasesCardiovascularSystem = diseasesCardiovascularSystem;
    this.age = age;
  }
  renderCardiologist() {
    super.renderVisit();
    this.visitContainer.querySelector('.visit-content-box__more-info-block').insertAdjacentHTML('beforeEnd', `
    <p>Presure: ${this.presure}</p>
    <p>Mass index: ${this.massIndex}</p>
    <p>Diseases cardiovascular system: ${this.diseasesCardiovascularSystem}</p>
    <p>Age: ${this.age}</p>
    `)
    document.querySelector('.visit-table').append(this.visitContainer);
  }
}

export class VisitTherapist extends Visit {
  constructor(id, doctor, reason, description, urgency, name, lastName, age, date, time) {
    super(doctor, reason, description, urgency, name, lastName, id, date, time);
    this.age = age;
  }
  renderTerapist() {
    super.renderVisit();
    this.visitContainer.querySelector('.visit-content-box__more-info-block').insertAdjacentHTML('beforeEnd', `
    <p>Age: ${this.age}</p>
    `)
    document.querySelector('.visit-table').append(this.visitContainer);
  }
}

function getStatus(date, time) {
  if (new Date(`${date} ${time}`).getTime() > Date.now()) {
    return 'open'

  } else {
   return  'done'
  } 
}

export function getIdCard() {
return idCard
}