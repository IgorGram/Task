"use strict";
var isFirstInputSet = false;
var isSecondInputSet = false;
var inputSum = document.getElementById("sum");
var body = document.getElementById("body");
var sumNumber = 11;

var firstCanvas = {
    canvas: document.getElementById("firstCanvas"),
    spanNumber: document.getElementById("firstNumber"),
    step:10,
    numberToCheck: 7,
    radius: 137,
    startAngle: Math.PI,
    input:document.getElementById("inputFirst"),
    endAngle: function () {
        return this.startAngle + Math.PI/this.step;
    }
};

var secondCanvas = {
    canvas: document.getElementById("secondCanvas"),
    spanNumber: document.getElementById("secondNumber"),
    step:10,
    numberToCheck: 4,
    radius: 78,
    startAngle: Math.PI,
    input:document.getElementById("inputSecond"),
    endAngle: function () {
        return this.startAngle + Math.PI/this.step;
    }
};

$(document).ready(
        draw.bind(firstCanvas)
);

// Слушаем нажатия на клавиатуру
body.addEventListener("keypress", function (event) {
    var numCode = event.charCode;
    var number = event.key;

    if(isFirstInputSet){
        if(numCode >= 48  && numCode <= 57){
            if(isSecondInputSet){
                putSum(number);
            }else {
                putNumberToInput.call(secondCanvas, number);
            }
        }
    }else {
        if(numCode >= 48  && numCode <= 57){
            putNumberToInput.call(firstCanvas, number);
        }
    }
});


/**
 * @description Отрисовка дуги с заданными параметрами
 */
function draw() {
    var canvas = this.canvas;
    var context = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height;
    var radius = this.radius;
    var counterClockwise = false;

    context.beginPath();
    context.arc(x, y, radius, this.startAngle, this.endAngle(), counterClockwise);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();

    this.startAngle = this.endAngle();
    this.endAngle = function () {
        return this.startAngle + Math.PI/this.step;
    };

    if(this.endAngle() > 2 * Math.PI){
        if(this.input){
            context.beginPath();
            context.moveTo(canvas.width - 8, canvas.height);
            var x1 = canvas.width - 18;
            var y1 = canvas.height - 18;
            context.lineTo(x1,y1);
            context.moveTo(canvas.width - 8, canvas.height);
            var x2 = x1 + 18;
            var y2 = canvas.height - 18;
            context.lineTo(x2, y2);
            context.stroke();
            this.input.classList.remove("input-block_hide");
        }
        return
    }

    requestAnimationFrame(draw.bind(this))
}

/**
 * @description Запись числа в инпут канвасов
 * @param number
 */
function putNumberToInput(number) {
    this.input.value = number;
    checkNumber.call(this,number);
}

/**
 * @description Проверка введенного номера на правильность
 * @param number
 */
function checkNumber(number) {
    if(+number !== this.numberToCheck){
        this.input.classList.add("number_wrong");
        this.spanNumber.classList.add("span-number_wrong");
    }else {
        this.input.classList.remove("number_wrong");
        this.spanNumber.classList.remove("span-number_wrong");
        this.input.classList.add("input-block_hide");
        if(!isFirstInputSet){
            isFirstInputSet = true;
                draw.call(secondCanvas);
            }else {
            isSecondInputSet = true;
            inputSum.classList.remove("input-block_hide");
            inputSum.value = "";
        }
    }
}

/**
 * @description Запсись числа в итоговый инпут с суммой
 * @param number
 */
function putSum(number) {
    inputSum.classList.remove("number_wrong");
    var value = inputSum.value;
    if(value.length === 1){
        value += number;
        inputSum.value = value;
        checkSumNumber(value)
    }else {
        inputSum.value = number
    }
}


/**
 * @description Проверка суммы
 * @param number
 */
function checkSumNumber(number) {
    if(+number !== sumNumber){
        inputSum.classList.add("number_wrong");
    }else {
        inputSum.classList.remove("number_wrong");
        inputSum.classList.add("input-block_hide");
    }
}