// TODOs: override the current p.innerHTML with the new bionified words




const pElements = document.getElementsByTagName("p");
var bionifiedWords = [];

console.log("grabbed this many ps " + pElements.length);
 
// find every p in the website
for (let i = 0; i < pElements.length; i++){
    
    let words = []; // list of words

    var currentBlock = pElements[i].innerHTML; // the current p
         
    var word = "";


    // go through every character in the given block
    for (let char = 0; char < currentBlock.length; char++){
        if (currentBlock.charAt(char) != ' '){
            // if current char is not a space, add it to word
            word = word + currentBlock.charAt(char);
        } else {
            // if the current char is space, add the full word to words
            words.push(word);
            word = '';
        }
    }

    // add the final word to the words
    words.push(word);
    

    // console.log(words);

    // call a function to add bionic reading to every word that we have seen
    bionify(words);
    // console.log("words:" + words);
    // console.log("bws: " + bionifiedWords);

    // override the current p block with the bionifiedWords
    // replaceWithBW(i);
    pElements[i].innerHTML = '';
    for (let x = 0; x < bionifiedWords.length; x++){
        console.log(bionifiedWords[x]);
        pElements[i].innerHTML = pElements[i].innerHTML + bionifiedWords[x] + " ";

    }

    bionifiedWords = [];
}


// take list of words, turn half of the word bold

// this is just a pElements to see if this thing works!!!
function bionify(words){
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
                // console.log(words[i][x]);
                if (bw.length == 0){ // first char
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