const nextButton = document.getElementById("nextButton");
const header = document.getElementById("header");

var checkboxes = document.getElementsByName("options");
var labels = document.getElementsByClassName("cbLabel");

var stage = 0;

const synth = window.speechSynthesis;



nextButton.onclick = function(){
    
    if(checkIfAnyCheckboxIsChecked() || stage == 2){
        stage++;
    }

    uncheckAll();

    if(stage == 1){
        setAttributeTypeTo("radio");
        header.textContent = "For how long have you had them?";
        textToSpeech(header.textContent, 7);

        labels[0].textContent = "1 day";
        labels[1].textContent = "2 to 5 days";
        labels[2].textContent = "5 to 12 days";
        labels[3].textContent = ">12 days";
    }

    else if(stage == 2){
        hideLabelsAndCheckboxes();
        header.textContent = "Check completed. Press \"Submit\" button to see the results.";
        textToSpeech(header.textContent, 7); 

        nextButton.textContent = "Submit";
        nextButton.style.padding = "30px 60px";
        nextButton.style.fontSize = "2em";
    }
    
    else if(stage == 3){
        nextButton.style.display = "none";
        header.style.fontSize = "2em";

        var message = "Congratulations! \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nYou have terminal cancer!";
        textPrinter(message, 40);
        textToSpeech(message, 7);    
    }
}

let voices;
var speech = new SpeechSynthesisUtterance()

function textToSpeech(text, voice){
    voices = synth.getVoices();
    speech.text = text;
    speech.voice = voices[voice];
    synth.speak(speech);
}

function checkIfAnyCheckboxIsChecked(){
    var checkedBoxes = 0;
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkedBoxes++;
        }
    }

    if(checkedBoxes > 0){
        return true;
    }
    return false;
}

async function textPrinter(text, delay){
    var textArray = text.split("");

    var printer = [];

    for(var i = 0; i < textArray.length; i++){
        printer[i] = String(textArray[i]);
        header.textContent = String(printer.join(""));
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function hideLabelsAndCheckboxes(){
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].style.display = "none";
    }
    for(var i = 0; i < labels.length; i++){
        labels[i].style.display = "none";
    }
}

function setAttributeTypeTo(attributeType){
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].setAttribute("type", attributeType);
    }
}

function uncheckAll(){
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}
