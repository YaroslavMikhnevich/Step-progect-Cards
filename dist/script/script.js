import Modal from "./Modal.js";
import { Visit, VisitDentist, VisitTherapist, VisitCardiologist } from "./Visit.js";
import { getData, deleteData, postData, putData, checkLogin } from "./requestFuntion.js";
import { filter } from "./filterSection.js"
import LoginPopUp from "./LoginPopUp.js"

const token = "4a202cb9-e44c-4997-92e0-009ca6c50893";



window.addEventListener('load', ()=>{
    if (sessionStorage.getItem('status') === '200') {
        document.querySelector(".header__button-block--login").style.display = "none";
        document.querySelector(".header__button-block--create-visit").style.display = "block";
        document.querySelector('.prelog-block').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    } 
})

//тут ми зібрали масив обєктів, які ми зберігаємо на сервері
export const arrData = await getData();
//викликаємо функцію, яка відповідає за фільтрацію карток 
filter();
//Opening and closing the login popup
document.querySelector(".header__button-block--login").addEventListener("click", function (event) {
    if (event.target.closest('button')) {
        new LoginPopUp().renderPopUp()
        setTimeout(() => {
            document.querySelector('.popup').classList.add('open-popup');
        }, 0);


        document.querySelector('.modal-background').addEventListener('click', function (event) {
            if (event.target.closest('div')) {
                document.querySelector('.modal-background').remove();
                document.querySelector(".popup").remove();
    
            }
        })
    }
});
document.querySelector('.header__button-block--create-visit').addEventListener('click', function (event) {
    if (event.target.closest('button')) {
        new Modal().renderModal();
        setTimeout(() => {
            document.querySelector('.modal-window').classList.add('open-popup');
        }, 0);

        document.querySelector('.modal-background').addEventListener('click', function (event) {
            if (event.target.closest('div')) {
                document.querySelector('.modal-background').remove();
                document.querySelector(".modal-window").remove();
    
            }
        })
    }
})
arrData.forEach(function (element) {
    if (element.doctor === "dentist") {
        const { id, doctor, reason, description, urgency, name, lastName, date, time, lastVisit } = element;
        new VisitDentist(lastName, id, doctor, reason, description, urgency, name, date, time, lastVisit).renderDentist();
    }

    else if (element.doctor === "cardiologist") {
        const { lastName, id, doctor, reason, name, description, urgency, presure, massIndex, diseasesCardiovascularSystem, age, date, time } = element;
        new VisitCardiologist(lastName, id, doctor, reason, name, description, urgency, presure, massIndex, diseasesCardiovascularSystem, age, date, time).renderCardiologist();
    }

    else if (element.doctor === "therapist") {
        const { id, doctor, reason, description, urgency, name, lastName, date, time, age } = element;
        new VisitTherapist(lastName, id, doctor, reason, description, urgency, name, age, date, time).renderTerapist();
    }
});

export function checkVisitTable() {
    if (document.querySelector('.visit-table').querySelector('.visit-card') === null) {
        document.querySelector('.visit-table').querySelector('.visit-table__message').style.display = 'block'
    } else{
        document.querySelector('.visit-table').querySelector('.visit-table__message').style.display = 'none'
 
    }
}
checkVisitTable()


//Функція, яка очищує всі картки
// let clientVisit = await getData()
// clientVisit.forEach(element => {
//     deleteData(element.id)
// });


