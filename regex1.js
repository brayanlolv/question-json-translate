

const dominio = "https://api-json-translate.onrender.com"
const postUrl = dominio + "/enviarJSONParser"
let titulo = document.querySelector("#titulo")
console.log(postUrl)

let text = ""

let botao = document.querySelector("#mandar")
let fileInput = document.querySelector("#file")
let div = document.querySelector("div")
fileInput.addEventListener("change", previewFile)
botao.addEventListener("click", main)


function previewFile() {
    const [file] = document.querySelector("input[type=file]").files
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
            // this will then display a text file
            div.innerText = reader.result;
            text = reader.result

        },
        false,
    );

    if (file) {
        reader.readAsText(file);
    }
}

async function main() {
    
    if (!text) return window.alert("selecione um arquivo")
    let questionsSplited = splitQuestions()
    let jsonResult = creatingJson(questionsSplited)
    postFetch(jsonResult)

}


function splitQuestions() {
    let result = []
    let arrayQuestions2 = []
    let arrayQuestions3 = []
    let arrayQuestions1 = text.split(/(?=\d\d\d\))/)

    arrayQuestions1.map((x) => {
        arrayQuestions2.push(x.split(/(?=[ \n\^d]\d\d\))/,))
    })

    arrayQuestions2.map((x) => {
        x.map((y) => {
            arrayQuestions3.push(y.split(/(?=[ \n\^d]\d\))/)) //espaco "vazios" sao contatoss
        })
    })

    //arrumar isso aqui

    for (let x = 0; x < arrayQuestions3.length; x++) {
        for (y = 0; y < arrayQuestions3[x].length; y++) {
            //arrayQuestions3[x][y].map((element)=>result.push(element))
            result.push(arrayQuestions3[x][y])
        }
    }
    return result

    // return  arrayQuestions1.concat(arrayQuestions2, arrayQuestions3)
}

function creatingObejectPerQuestion(question) {

    let result = {
        number: null,
        question: null,
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
       // answer: null,
    }
    const splitedQuestion = question.split(/(?=[abcde]\))/)
    splitedQuestion.map((element) => {
        let textQuestion = element.replace(/\n/, "")
        if (/\d/.test(textQuestion.split(")")[0])) {
            result.question = textQuestion
            result.number = textQuestion.split(")")[0]
        }
        if (/[abcde]/.test(textQuestion.split(")")[0])) result[textQuestion.split(")")[0]] = textQuestion
    })
    if ([result.a, result.b, result.c, result.d].includes[null]) {

        console.log("deu ruim")
        return null
    }
    return result
}

function creatingJson(array) {
    let result = []

    array.map((element) => {
        result.push(creatingObejectPerQuestion(element))
    })

    return (JSON.stringify(result))

}

async function postFetch(data) {
    let postTitle = titulo.value == "" ? "suasQuestoesemJSON" : titulo.value
    
    console.log(postTitle)

    let bodyObj = {
        title: postTitle,
        data: data
    }

    await fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(bodyObj) ,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    window.location.href = dominio+`/baixarJsonParser/${bodyObj.title}`;
}
