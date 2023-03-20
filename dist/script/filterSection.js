import {arrData} from "./script.js";
export function filter() {
    const visitTable = document.querySelector('.visit-table');

//інпут фільтер по ключовому слові
document.querySelector('.keyword-input').addEventListener('input', function (event) {
    if (event.target.closest('input')) {
        let value = this.value.trim();
        arrData.forEach(el => {
            let bullian = false;
            for (const key in el) {
                if (typeof (el[key]) === 'string') {
                    if ((el[key]).includes(value)) {
                        bullian = true;

                    }  
                }
            }
            let displayStyle =  bullian?'block':'none';
            document.getElementById(el.id).style.display = displayStyle; 
        })
    }
})



document.querySelector('.status-input').addEventListener('change', function () {

    document.querySelectorAll('.visit-container').forEach(element => {
        let value = this.value.trim();

        arrData.forEach(el => {
                    if (el.status === value) {
                        document.getElementById(el.id).style.display = 'block'
                    }   else if(value === 'All'){
                        document.getElementById(el.id).style.display = 'block'
                    } else {
                        document.getElementById(el.id).style.display = 'none'
                    }
        })
 
    })

})

document.querySelector('.priority-input').addEventListener('change', function () {
    document.querySelectorAll('.visit-container').forEach(element => {
        let value = this.value.trim();
        arrData.forEach(el => {
                    if (el.urgency === value) {
                        document.getElementById(el.id).style.display = 'block'
                    }   else if(value === 'All'){
                        document.getElementById(el.id).style.display = 'block'
                    } else {
                        document.getElementById(el.id).style.display = 'none'
                    }
        })




    })


})

}