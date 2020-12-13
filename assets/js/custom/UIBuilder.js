function loadCollections(collection, selector) {
    let node = $(selector);
    collection.forEach((item, index) => {
        let request = new PostmanRequest(item);
        node.append(requestToCard(request, index));
    });
}

function requestToCard(request) {
    let karateScript = new KarateBuilder().toKarateScript(request);
    let card = [
        '<div class="card" style="padding:7px;">',
        `    <h3>Script Name: ${request.name}</h3> `,
        `    <textarea class="karate-content" rows="10" cols="50" id="">`,
        karateScript.join("\n"),
        '    </textarea>',
        '<button> Save </button>',
        '</div>'
    ]
    return card.join("\n");
}

