function loadCollections(selector) {
    let node = $(selector);
    let cards = "";
    _postman_collection = _postman_collection.map(item => new PostmanRequest(item))
    _postman_collection.forEach((item, index) => {
        cards = cards + requestToCard(item, index);
    });
    node.html(cards);
}

function requestToCard(request, index) {
    let karateScript = new KarateBuilder().toKarateScript(request);
    let card = [
        `<div class="card" style="padding:7px;" id="_pm_request${index}">`,
        `    <h3>Script Name: ${request.name}</h3> `,
        `    <textarea class="karate-content" rows="10" cols="50" id="_pm_content${index}">`,
        karateScript.join("\n"),
        '    </textarea>',
        `   <div style="display:flex;justify-content:flex-end;"><input style="width:100%;text-align:right;" type="text" id="_pm_filename${index}" value="${request.fileName}"><h4 style="margin-top:0;margin-bottom:0">.feature</h4></div>`,
        `   <button onclick="saveFile(${index})"> Save </button>`,
        `   <button onclick="refreshCard(${index})"> Reload </button>`,
        '</div>'
    ]

    return card.join("\n");
}

function refreshCard(index) {
    if (_postman_collection && _postman_collection.length > 0) {
        let request = _postman_collection[index];
        let content = $(`#_pm_content${index}`);
        let karateScript = new KarateBuilder().toKarateScript(request);
        content.text(karateScript.join("\n"));
    }
}

function saveFile(index) {
    let content = $(`#_pm_content${index}`).val();
    let fileName = $(`#_pm_filename${index}`).val();
    let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName + ".feature");
}

// function updateCard()

