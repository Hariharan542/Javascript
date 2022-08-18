let hari='Paragraphs are medium-sized units of writing, longer than sentences, but shorter than sections, chapters, or entire works. Because they connect the "small" ideas of individual sentences to a "bigger" idea, paragraph structure is essential to any writing for organization, flow, and comprehension. Students have a lot of questions when it comes to writing a paragraph: How many sentences should you use? How do you transition within a paragraph? When do you end a paragraph? Etc. Below we explain everything you need to know about paragraph structure to write like an expert, including several paragraph examples.';
console.log("no of sentence : " + hari.split(".").length);
console.log("no of words : " + hari.split(" ").length);
let x=hari.split(".").length;
console.log("no of characters : "+x);
console.log("no of occurence 'paragraph' : "+hari.match(/paragraph/gi).length);
console.log("no of special characters : "+hari.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g).length);
console.log("replace word : "+ hari.replace(/paragraph/gi, "para"));
for(var i=0;i<hari.length;i++){
    if(hari[i]=='.'){
        var ind=i;
        break;
    }
}
console.log("slice : "+hari.slice(ind+1));