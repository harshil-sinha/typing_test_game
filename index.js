//(actualtime/totaltimetaken)*60;
const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#showSentence');
const show_time = document.querySelector('#show-time');

let startTime, endTime, totalTimeTaken, sentence_to_write;

const sentences = ["He ran out of money, so he had to stop playing poker.","The murder hornet was disappointed by the preconceived ideas people had of him.","All they could see was the blue water surrounding their sailboat."];

const errorChecking = (words)=>{
    let num = 0;
    sentence_to_write = show_sentence.innerHTML;
    sentence_to_write = sentence_to_write.trim().split(" ");
    for(let i=0; i<words.length; i++){
        if(words[i]===sentence_to_write[i]){
            num++;
        }
    }
    return num;
}
const calculateTypingSpeed = (time_taken)=>{
    let totalWords = typing_ground.value.trim();
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ");

    actualWords = errorChecking(actualWords);

    if(actualWords!==0){
        let typing_speed = (actualWords/time_taken)*60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${time_taken} sec`;
    }
    else{
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
    }

}

const endTypingTest = ()=>{
    btn.innerText = "Start";
    showTimer();

    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken =  (endTime-startTime)/1000;
    totalTimeTaken = Math.round(totalTimeTaken);
    // console.log(totalTimeTaken);
    calculateTypingSpeed(totalTimeTaken);
    show_sentence.innerHTML = "";
    typing_ground.value = "";
}

let intervalId, elapsedTime = 0;
const showTimer = ()=>{
    if(btn.innerText==="Done"){
        intervalId = setInterval(() => {
            elapsedTime++;
            show_time.innerHTML = elapsedTime;
        }, 1000);
    }
    else if(btn.innerText==="Start"){
        elapsedTime = 0;
        clearInterval(intervalId);
        show_time.innerHTML = "";
    }
}
const startTyping = ()=>{
    const randomNumber = Math.floor(Math.random()*sentences.length);
    show_sentence.innerHTML = sentences[randomNumber];

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";
    showTimer();

}

btn.addEventListener('click',()=>{
    switch(btn.innerText.toLowerCase()){
        case "start":
            typing_ground.removeAttribute('disabled');
            startTyping();
            break;
        case "done":
            typing_ground.setAttribute('disabled','true');
            endTypingTest();
            break;

    }
})
