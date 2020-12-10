$(document).ready(() => {
    let fileInput = $("#file-selector");
    let scripts = $("#main");
    $(fileInput).change(async function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        let promise = promiseReadJSONFile(fileList[0]);
        let content = null;
        await promise.then((pm) => content = pm).catch((err) => console.log(err));
        content.item.forEach((item, index) => {
            let request = new PostmanRequest(item);
            let script = new KarateBuilder().toKarateScript(request);
            scripts.append(scriptToCard(request, script))
        });

    });
});
