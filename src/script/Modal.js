import { getData, deleteData, postData, putData } from "./requestFuntion.js";
import { Visit, VisitDentist, VisitTherapist, VisitCardiologist } from "./Visit.js";
import { arrData } from "./script.js";
import {checkVisitTable} from "./script.js"
import {getIdCard} from "./Visit.js";


export default class Modal {
  constructor() {
    this.text = `
      <div class="modal-window" >
      <div class="modal-window-content-box">
          <h3 class="modal-window__title">Enter the details of the visi</h3>

          <div class="input-box-modal">
          <label for=""> Select doctor </label>
          <select class="modal-window__select item">
              <option value=""></option>
              <option value="dentist">Dentist</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="therapist">Therapist</option>
          </select>
          </div>

          <div style="display: none" class="modal-window__main-visit-info" style="display: block;">
            <div class="input-box-modal">
                  <label for=""> Enter date of visit </label>
                  <input class="modal-window__date item" type="date" class="item">
            </div>
            <div class="input-box-modal">
                <label for=""> Enter time of visit </label>
                 <input class="modal-window__time item"  type="time" class="item">
            </div>

             <div class="input-box-modal">
                 <label for="">Enter the reason of the visit</label>
                  <input class="modal-window__main-visit-info--reason item" type="text">
              </div>

              <div class="input-box-modal">
                  <label for="">Enter the short description for the visit</label>
                  <input class="modal-window__main-visit-info--description item" type="text">
              </div>

              <div class="input-box-modal">
                  <label for="">Select priority of visit</label>
                  <select  class="modal-window__main-visit-info--urgency-visit item">
                  <option value=""></option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                  </select>
              </div>
                  
              <div class="input-box-modal">
                  <label for="">Enter the name of the client</label>
                  <input class="modal-window__main-visit-info--client-name item">
              </div>
              <div class="input-box-modal">
                  <label for="">Enter the last name of the client</label>
                  <input class="modal-window__main-visit-info--client-last-name item">
              </div>
            
            </div>   
                
            <div class="modal-window__additional-info"">
           
            </div>
      <div class="modal-window__submit-block"">
      <input type="submit" value="create visit" class="modal-window__submit-block--confirm">
      <input type="submit" value="close" class="modal-window__submit-block--close">
      </div>
    </div>
  </div>
      `
  }

  renderModal() {

    document.querySelector('.header').insertAdjacentHTML('beforebegin', '<div display="block" class="modal-background"></div>');

    document.querySelector('.container').insertAdjacentHTML('afterBegin', this.text);

    //вішаєил івент на селект 
    document.querySelector('.modal-window__select').addEventListener("change", function (event) {

      if (document.querySelector(".modal-window__select").value === "cardiologist") {
        document.querySelector(".modal-window__submit-block").style.bottom =
          "-20px";
        new Modal().renderCardiologist();
        document.querySelector(".modal-window__main-visit-info").style.display =
          "block";
        document.querySelector(".modal-window__additional-info").style.display =
          "block";
        document.querySelector(".modal-window").style.height = "95%";
        document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
      }

      else if (document.querySelector(".modal-window__select").value === "dentist") {
        document.querySelector(".modal-window__submit-block").style.bottom =
          "-20px";
        document.querySelector(".modal-window__additional-info").innerHTML = "";
        new Modal().renderDentist();
        document.querySelector(".modal-window__main-visit-info").style.display = "block";
        document.querySelector(".modal-window__additional-info").style.display = "block";
        document.querySelector(".modal-window").style.height = "75%";
        document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
      }
      else if (document.querySelector(".modal-window__select").value === "therapist") {
        document.querySelector(".modal-window__submit-block").style.bottom =
          "-20px";
        document.querySelector(".modal-window__additional-info").innerHTML = "";
        new Modal().renderTerapist();
        document.querySelector(".modal-window__main-visit-info").style.display = "block";
        document.querySelector(".modal-window__additional-info").style.display = "block";
        document.querySelector(".modal-window").style.height = "75%";
        document.querySelector(".modal-window__submit-block--confirm").style.display = "block";
      } else {
        document.querySelector(".modal-window__main-visit-info").innerHTML = "";
        document.querySelector(".modal-window__additional-info").innerHTML = "";
        document.querySelector(".modal-window").style.height = "35%";
      }
    });

    //івент на кнопці підтвердити візит
    document.querySelector('.modal-window__submit-block--confirm').addEventListener('click', async function (event) {

      if (event.target.closest("input")) {
        const arr = document.querySelector(".modal-window").querySelectorAll(".item");
        const newArr = ['id'];
        arr.forEach((element) => {
          newArr.push(element.value);
        });

        let bullian = newArr.some(el => {
          return el === ''
        }); 

        if (bullian) {
          arr.forEach(el => {
            if (el.value === '') {
              el.style.border = '1px solid red'
            }
          })
          document.querySelector('.error-block').style.display = 'block'

        } else {
          document.querySelector('.modal-background').remove();
          if (document.querySelector('.modal-window__submit-block--confirm').getAttribute("data-edit") === "edited") {
            let ID = getIdCard();

            // document.getElementById(`${ID}`).remove()
            // console.log(document.getElementById(`${ID}`));
            if (document.querySelector(".modal-window__select").value === "dentist") {

              const putRequest = await putData(new VisitDentist(newArr[8], ID, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[2], newArr[3], newArr[9]));
              const data = await putRequest.json()
              if (putRequest.status === 200) {
                const cards = document.querySelectorAll('.visit-card');

                cards.forEach(element => {
                  if (element.id === `${ID}`) {
                    console.log(ID);
                    element.remove()
                  }
                });
                let card = new VisitDentist(newArr[8], data.id, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[2], newArr[3], newArr[9]);
                card.renderDentist()
                arrData.push(card);
              } else {
                alert('Error, the map would not be created, try again')
              }
            }

            else if (document.querySelector(".modal-window__select").value === "cardiologist") {
              const putRequest = await putData(new VisitCardiologist(newArr[8], ID, newArr[1], newArr[4], newArr[7], newArr[5], newArr[6], newArr[9], newArr[10], newArr[11], newArr[12], newArr[2], newArr[3]));
              const data = await putRequest.json()
              if (putRequest.status === 200) {
                const cards = document.querySelectorAll('.visit-card');
                cards.forEach(element => {
                  if (element.id === `${ID}`) {
                    element.remove()
                  }
                });
                let card = new VisitCardiologist(newArr[8], data.id, newArr[1], newArr[4], newArr[7], newArr[5], newArr[6], newArr[9], newArr[10], newArr[11], newArr[12], newArr[2], newArr[3]);
                card.renderCardiologist()
                arrData.push(card);

              } else {
                alert('Error, the map would not be created, try again')
              }
            }

            else if (document.querySelector(".modal-window__select").value === "therapist") {
              const putRequest = await putData(new VisitTherapist(newArr[8], ID, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[9], newArr[2], newArr[3]));
              const data = await putRequest.json()


              if (putRequest.status === 200) {
                const cards = document.querySelectorAll('.visit-card');
                cards.forEach(element => {
                  if (element.id === `${ID}`) {
                    element.remove()
                  }
                });
                let card = new VisitTherapist(newArr[8], data.id, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[9], newArr[2], newArr[3]);
                card.renderTerapist()
                arrData.push(card);

              } else {
                alert('Error, the map would not be created, try again')
              }

            }
          }


          else {
            if (document.querySelector(".modal-window__select").value === "dentist") {
              const postRequest = await postData(new VisitDentist(newArr[8], newArr[0], newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[2], newArr[3], newArr[9]));
              const data = await postRequest.json()

              if (postRequest.status === 200) {
                let card = new VisitDentist(newArr[8], data.id, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[2], newArr[3], newArr[9]);
                arrData.push(card);
                card.renderDentist()
              } else {
                alert('Error, the map would not be created, try again')
              }
            }

            else if (document.querySelector(".modal-window__select").value === "cardiologist") {
              const postRequest = await postData(new VisitCardiologist(newArr[8], newArr[0], newArr[1], newArr[4], newArr[7], newArr[5], newArr[6], newArr[9], newArr[10], newArr[11], newArr[12], newArr[2], newArr[3]));
              const data = await postRequest.json()
              console.log(postRequest);
              console.log(data);
              if (postRequest.status === 200) {
                let card = new VisitCardiologist(newArr[8], data.id, newArr[1], newArr[4], newArr[7], newArr[5], newArr[6], newArr[9], newArr[10], newArr[11], newArr[12], newArr[2], newArr[3]);
                arrData.push(card);
                card.renderCardiologist();
              } else {
                alert('Error, the map would not be created, try again')
              }
            }

            else if (document.querySelector(".modal-window__select").value === "therapist") {
              const postRequest = await postData(new VisitTherapist(newArr[8], newArr[0], newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[9], newArr[2], newArr[3]));
              const data = await postRequest.json()
              if (postRequest.status === 200) {
                let card = new VisitTherapist(newArr[8], data.id, newArr[1], newArr[4], newArr[5], newArr[6], newArr[7], newArr[9], newArr[2], newArr[3]);
                arrData.push(card)
                card.renderTerapist();

              } else {
                alert('Error, the map would not be created, try again')
              }
            }
          }
          document.querySelector('.modal-window').remove()
        }
        checkVisitTable()
      }
    })
    document.querySelector('.modal-window__submit-block--close').addEventListener('click', function () {
      if (event.target.closest('input')) {
        document.querySelector('.modal-background').remove();
        document.querySelector('.modal-window').remove()
      }
    })
  }

  renderDentist() {
    document.querySelector(".modal-window__additional-info").innerHTML = "";
    document.querySelector(".modal-window__additional-info").insertAdjacentHTML('afterbegin', `
    <div class="input-box-modal">
    <label for=""> Enter date of visit </label>
    <input value=""  class="modal-window__date item" type="date" class="item">
          </div>

    <div class="error-block">
            <p class="error-block__message">Not all fields are filled. </p>
            <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
            </div>   
    `);
  }

  renderCardiologist() {
    document.querySelector(".modal-window__additional-info").innerHTML = "";

    document.querySelector(".modal-window__additional-info").insertAdjacentHTML('afterbegin', `


  <div class="input-box-modal">
  <label for="">Enter normal presure</label>
  <input  value="" type="number" class="item">
  </div>

  <div class="input-box-modal">
  <label for="">Enter body mass index</label>
  <input value=""  type="number" class="item">
  </div>

  <div class="input-box-modal">
  <label for="">Enter diseases of the cardiovascular system</label>
  <input value="" type="text" class="item">
  </div>

  <div class="input-box-modal">
  <label for="">Enter age</label>
  <input value="" type="number" class="item">
  </div>

  <div class="error-block">
          <p class="error-block__message">Not all fields are filled. </p>
          <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
          </div>   
  `)

  }

  renderTerapist() {
    document.querySelector(".modal-window__additional-info").innerHTML = "";
    document.querySelector(".modal-window__additional-info").insertAdjacentHTML('afterbegin', `    
    <div class="input-box-modal">
    <label for="">Enter age</label>
    <input value="" type="number" class="item">
    </div>

    <div class="error-block">
            <p class="error-block__message">Not all fields are filled. </p>
            <p class="error-block__message">To create a visit card, fill in all the required fields. </p>
            </div>   
    `)

  }
}  