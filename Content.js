// TODOs: override the current p.innerHTML with the new bionified words DONE
// add spans into this DONE
// make sure links don't get messed up, figure out how to deal with <a> stuff DONE
// make sure the bolded parts don't change font-family DONE

// make it work with spans as well Done
// make it work on wiki, ctv, CBC bug


// fetch messages here to prevent slowing down tabs
const pElements = document.getElementsByTagName("p");
const spanElements = document.getElementsByTagName("span");
var bionifiedWords = [];


console.log(pElements);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(sender.tab ? 
        //     "from a content script: " + sender.tab.url :
        //     "from the extension");
        if (request.message == "zap!"){
            
            
            // signal received message, then zap the page
            console.log("received message.");
            fetchWords(spanElements, "span");
            fetchWords(pElements,"p");
        }
    }
);









function fetchWords(theElementToChange, theElement){

    console.log("grabbed this many elements " + theElementToChange.length);
    
    // find every p in the website
    for (let i = 0; i < theElementToChange.length; i++){
        let words = []; // list of words
    
        // var currentBlock = pElements[i].innerHTML; // the current p
             
        var word = "";
    
        //asdasd <a href=""></a>
        // go through every character in the given block
        for (let char = 0; char < theElementToChange[i].innerHTML.length; char++){
            
            if (theElementToChange[i].innerHTML.charAt(char) == '<'){
                words.push(word);
                console.log("current word added(start):" + word);
                word = '';
                var counter = 0;
                // word = word + theElementToChange[i].innerHTML.charAt(char);
                for (let x = char; x < theElementToChange[i].innerHTML.length; x++){
                    word = word + theElementToChange[i].innerHTML.charAt(x);
                    if (theElementToChange[i].innerHTML.charAt(x) == '>'){
                        counter++;
                        if (counter == 2){
                            char = x;
                            break;
                        }
                    }
                }
            }else if (theElementToChange[i].innerHTML.charAt(char) != ' ' ){
                
                // if current char is not a space, add it to word
                word = word + theElementToChange[i].innerHTML.charAt(char); 
                
                
                
            } else {
                // if the current char is space, add the full word to words
                words.push(word);
                console.log("current word added (end):" + word);
                word = '';
                
            }
        }
    
        // add the final word to the words
        words.push(word);

        // console.log(words);
        
        
    
        // call a function to add bionic reading to every word that we have seen
        if (theElement == "span"){
            bionifySpan(words);
        } else {
            bionifyP(words);
        }
        
        // console.log("words:" + words);
        // console.log("bws: " + bionifiedWords);
    
        // override the current p block with the bionifiedWords
        // replaceWithBW(i);
        theElementToChange[i].innerHTML = '';
        for (let x = 0; x < bionifiedWords.length; x++){
            // console.log(bionifiedWords[x]);
            theElementToChange[i].innerHTML = theElementToChange[i].innerHTML + bionifiedWords[x] + " ";
    
        }
    
        bionifiedWords = [];
    }
}




// take list of words, turn half of the word bold

// this is just a pElements to see if this thing works!!!
function bionifyP(words){
    // console.log(words);
    // for half of every word, add <b> </b>
    var bionicWord = "";

     // go over each character in word
    for (let i = 0; i < words.length; i++){
        if (words[i].length == 1){ // word with only 1 character
            // console.log("one character");
            let bw = '<span style="font-weight: bold;">' + words[i].charAt(words[i].length - 1) + '</span>';
            bionifiedWords.push(bw);
        } else if (words[i].length == 2){ // word with 2 characters
            // console.log("two characters");
            let bw = '<span style="font-weight: bold;">' + words[i].charAt(words[i].length - 2) + '</span>' + words[i].charAt(words[i].length - 1);
            bionifiedWords.push(bw);
        } else { // word with more than 2 characters
            let bw = '';
            for (let x = 0; x < words[i].length; x++){
                if (words[i][x] == '<'){
                    bionifiedWords.push(words[i]);
                    x = words[i].length - 1;
                } else if (bw.length == 0){ // first char
                    bw = '<span style="font-weight: bold;">' + words[i][x]; 
                } else if (isMiddle(words[i], words[i][x])) { // middle char
                    bw = bw + words[i][x] + '</span>';
                } else {
                    bw = bw + words[i][x];
                }
            }
            bionifiedWords.push(bw);
            bw = '';
            
        }

        // console.log(bionifiedWords);
    }
}

function bionifySpan(words){
    // console.log(words);
    // for half of every word, add <b> </b>
    var bionicWord = "";

     // go over each character in word
    for (let i = 0; i < words.length; i++){
        if (words[i].length == 1){ // word with only 1 character
            // console.log("one character");
            let bw = '<b>' + words[i].charAt(words[i].length - 1) + '</b>';
            bionifiedWords.push(bw);
        } else if (words[i].length == 2){ // word with 2 characters
            // console.log("two characters");
            let bw = '<b>' + words[i].charAt(words[i].length - 2) + '</b>' + words[i].charAt(words[i].length - 1);
            bionifiedWords.push(bw);
        } else { // word with more than 2 characters
            let bw = '';
            for (let x = 0; x < words[i].length; x++){
                if (words[i][x] == '<'){
                    bionifiedWords.push(words[i]);
                    x = words[i].length - 1;
                } else if (bw.length == 0){ // first char
                    bw = '<b>' + words[i][x]; 
                } else if (isMiddle(words[i], words[i][x])) { // middle char
                    bw = bw + words[i][x] + '</b>';
                } else {
                    bw = bw + words[i][x];
                }
            }
            bionifiedWords.push(bw);
            bw = '';
            
        }

        // console.log(bionifiedWords);
    }
}


// checks to see if a letter is the middle of a word
function isMiddle(aWord,potentialMid){
    // first check if the word length is even
    if (aWord.length % 2 == 0){
        // console.log("even length");
        const middle = aWord[(aWord.length / 2) - 1];
        if (middle == potentialMid){
            return true;
        }
    } else { // word is of odd length, so find the middle
        // console.log("odd length");
        const middle = aWord[Math.floor(aWord.length / 2)];
        // console.log("potential middle: " + potentialMid);
        // console.log("actual middle: " + middle);
        if (middle == potentialMid){
            return true;
        }
    }
    return false;
}


// function replaceWithBW(i){
//     for (let p = 0; p < pElements[i].innerHTML.length; p++){
//         // pElements[i].innerHTML
//         // console.log("pElement length: " + pElements[p].innerHTML.length);
//         console.log("pElements: " + pElements[p].innerHTML);
//         console.log(bionifiedWords);
//     }
// }