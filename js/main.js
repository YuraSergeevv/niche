window.onload = function () {

    let buttonsFile = document.querySelectorAll('.btb_file-js , .clip-js');
    for (const buttonFile of buttonsFile) {
        let file = buttonFile.closest('.input_item').querySelector('.file-js');
        buttonFile.addEventListener('click', function () {
            file.click();
        });
        file.addEventListener('change', function () {
            let name = (file.value.split('\\'));
            if (!name[name.length - 1] == '') {
                buttonFile.innerText = name[name.length - 1];
                if (buttonFile.closest('.input_item').querySelector('.file_name')) {
                    buttonFile.closest('.input_item').querySelector('.file_name').remove();
                }
                buttonFile.insertAdjacentHTML('afterend', `<div  class='item_current file_name'>${buttonFile.innerText}<label class='delete_file'></label></div>`);
            }
            else {
                buttonFile.innerText = buttonFile.getAttribute('data-text');
                buttonFile.closest('.input_item').querySelector('.file_name').remove();
            }
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains("button_burger")) {
            document.querySelector('.nav_bar').classList.add('active');
        }
        if (e.target.classList.contains("close_menu")) {
            document.querySelector('.nav_bar').classList.remove('active');
        }
        if (!e.target.closest('.select')) {
            for (const item of document.querySelectorAll('.select')) {
                item.classList.remove('is-active');
            }
        }
        if (e.target.classList.contains('delete_file')) {
            e.target.closest('.input_item').querySelector('.file-js').value = '';
            e.target.closest('.input_item').querySelector('.btb_file-js, .clip-js').innerText = e.target.closest('.input_item').querySelector('.btb_file-js, .clip-js').getAttribute('data-text');
            e.target.closest('.input_item').querySelector('.file_name').remove();

        }

        if (e.target.classList.contains('add_product')) {
            e.target.before(e.target.previousElementSibling.cloneNode(true));
            e.target.previousElementSibling.querySelectorAll('input')
            for (const input of e.target.previousElementSibling.querySelectorAll('input')) {
                input.value = '';
            }
        }

        if (e.target.classList.contains('delete_product')) {
            e.target.closest('.input_block').remove();
            console.log(e.target);

        }
    })

    let steps = document.querySelectorAll('.step.last');
    for (const step of steps) {
        step.addEventListener('click', function (e) {
            let stepNum = step.classList[0].split('_')[1];
            let stepContent = step.closest('.content_step');
            stepContent.classList.remove('active');
            stepContent = document.getElementById(stepNum);
            stepContent.classList.add('active');
        })
    }


    let NButtons = document.querySelectorAll('.next_js');
    for (const Button of NButtons) {
        Button.addEventListener('click', function () {
            let stepContent = Button.closest('.content_step');
            stepContent.classList.remove('active');
            stepContent.nextElementSibling.classList.add('active');
            validation();
        })
    }

    let PButtons = document.querySelectorAll('.prev_js');
    for (const Button of PButtons) {
        Button.addEventListener('click', function () {
            let stepContent = Button.closest('.content_step');
            stepContent.classList.remove('active');
            stepContent.previousElementSibling.classList.add('active');
        })
    }


    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');
        let selectOut = document.querySelector('.select_out');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle)
        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose)
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }

        function selectChoose() {
            this.previousElementSibling.addEventListener('change', selectCheck)
        }

        function selectCheck() {
            let selectCurrent = this.closest('.select').querySelector('.select__current');
            if (this.checked) {
                selectOut.insertAdjacentHTML('beforeend', `<div  class='item_current'>${this.id}<label for='${this.id}'></label></div>`);

                if (selectCurrent.getAttribute('data-text')) {
                    selectCurrent.insertAdjacentHTML('beforeend', `<label for='${this.id}'>${this.id}</label>`);
                }
                else {
                    selectCurrent.setAttribute('data-text', selectCurrent.innerText);
                    selectCurrent.innerText = '';
                    selectCurrent.insertAdjacentHTML('beforeend', `<label for='${this.id}'>${this.id}</label>`);
                }
            }
            else {
                selectOut.querySelector(`label[for=${this.id}]`).closest('.item_current').remove();
                selectCurrent.querySelector(`label[for=${this.id}]`).remove();

                if (!selectCurrent.innerText) {
                    selectCurrent.innerText = selectCurrent.getAttribute('data-text');
                    selectCurrent.removeAttribute('data-text');
                }
            }
        }

    };


    for (const item of document.querySelectorAll('.required input')) {
        item.addEventListener('change', function () {
            validation();
        })
    }

    function validation() {
        let inputsValidation = document.querySelectorAll('.active .required');
        let check = false;
        for (const input of inputsValidation) {
            check = false;
            for (const item of input.querySelectorAll('input[type="text"]')) {
                if (item.value) {
                    check = true;
                    break;
                }
                else {
                    check = false;
                }
            }
            if (check) {
                input.setAttribute('data-required', true);
            }
            else {
                input.setAttribute('data-required', '');
            }



            for (const item of input.querySelectorAll('input[type="radio"], input[type="checkbox"]')) {
                if (item.checked) {
                    check = true;
                    break;
                }
                else {
                    check = false;
                }
            }
            if (check) {
                input.setAttribute('data-required', true);
            }
            else {
                input.setAttribute('data-required', '');
            }
        }
        check = true;
        for (const input of inputsValidation) {
            if (!input.getAttribute('data-required')) {
                check = false
            }
        }
        if (check) {
            document.querySelector('.active .next_js').classList.remove('off');
        }
        else {
            document.querySelector('.active .next_js').classList.add('off');
        }
    }

    // validation();
    select();
};
