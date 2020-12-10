function scriptToCard(request, script) {
    let card = [
        '<div class="card" style="padding:7px;">',
        `    <h3>Script Name: ${request.name}</h3> `,
        '    <textarea class="karate-content" rows="10" cols="50">',
        script.join("\n"),
        '    </textarea>',
        '<button> Save </button>',
        '</div>'
    ]


    return card.join("\n");
}
