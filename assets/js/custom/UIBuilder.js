function loadCollections(collection, selector) {
    let node = $(selector);
    let cards = "";
    collection.forEach((item, index) => {
        let request = new PostmanRequest(item);
        cards = cards + requestToCard(request, index);
    });
    node.html(cards);
}

function requestToCard(request, index) {
    let karateScript = new KarateBuilder().toKarateScript(request);
    let card = [
        `<div class="card" style="padding:7px;" id="_pm_request${index}">`,
        `    <h3>Script Name: ${request.name}</h3> `,
        `    <h3>File Name: ${request.fileName}</h3> `,
        `    <textarea class="karate-content" rows="10" cols="50" id="_pm_content${index}">`,
        karateScript.join("\n"),
        '    </textarea>',
        `<button onclick="saveFile('${request.fileName}',${index})"> Save </button>`,
        '</div>'
    ]

    return card.join("\n");
}

function saveFile(fileName, index) {
    let content = $(`#_pm_content${index}`).text();
    let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}

