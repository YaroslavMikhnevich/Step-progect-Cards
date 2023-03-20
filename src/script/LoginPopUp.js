import {checkLogin } from "./requestFuntion.js";
export default class LoginPopUp {
    constructor() {
        this.popup = document.createElement('div');

    }
    renderPopUp() {
        this.popup.classList.add('popup');
        this.popup.id = 'popup'
        this.popup.innerHTML = ` 
        <h2>Login</h2>
        <div class="inputfields">
            <input type="text" name="username" id="username" placeholder="username" />
            <input type="password" name="password" id="password" placeholder="password" />
        </div>
        <div class="error-block">
        <p class="error-block__message">Incorrect login or password. Try again.</p>
        </div>
        <button id="closePopup">Login</button>
     `;

        this.popup.addEventListener("click", async function (event) {
            if (event.target.closest('button')) {
               let userName = this.querySelector('#username').value;
               let passWord = this.querySelector('#password').value; 
                let status = await checkLogin(userName, passWord)
                    if (status === 200) {
                        sessionStorage.setItem('status', '200')
                        popup.classList.remove("open-popup");
                        document.querySelector(".header__button-block--login").style.display = "none";
                        document.querySelector(".header__button-block--create-visit").style.display = "block";
                        document.querySelector('.modal-background').remove();
                        document.querySelector('.prelog-block').style.display = 'none';
                        document.querySelector('.container').style.display = 'block';
                    } else{
                        document.querySelector('.error-block').style.display = 'block'
                    }

            }
        });
        document.querySelector('.header').insertAdjacentHTML('beforebegin', '<div display="block" class="modal-background"></div>');
        document.body.append(this.popup)

    }
}