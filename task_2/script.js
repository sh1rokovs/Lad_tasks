var formElement = document.forms['formElement'].querySelectorAll('input');

formElement.forEach(elem => {
    elem.onfocus = focusFunction
    elem.onblur = blurFunction
})

function focusFunction(event) {
    if (event.target.className) {
        event.target.className = ""
    }
    event.target.className = "focused"
};

function blurFunction(event) {
    event.target.className = ""
};
