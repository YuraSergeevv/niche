window.onload = function () {

    let buttonsFile = document.querySelectorAll('.btb_file-js');
    for (const buttonFile of buttonsFile) {
        buttonFile.addEventListener('click', function () {
            let file = this.closest('.input_item').querySelector('.file-js');
            file.click();
            file.addEventListener('change', function () {
                let name = (file.value.split('\\'));
                if (name[name.length - 1]) {
                    buttonFile.innerText = name[name.length - 1];
                }
                else {
                    buttonFile.innerText = buttonFile.getAttribute('data-text');;
                }
            })
        });

    }

    let steps = document.querySelectorAll('.step');
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

};