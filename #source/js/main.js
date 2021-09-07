window.onload = function () {

    let buttonsFile = document.querySelectorAll('.btb_file-js')
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

};