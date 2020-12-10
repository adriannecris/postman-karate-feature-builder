$(document).ready(() => {
    let fileInput = $("#file-selector");
    let features = $(".karate-content");
    $(fileInput).change(async function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        let promise = promiseReadJSONFile(fileList[0]);
        let content = null;
        await promise.then((pm) => content = pm).catch((err) => console.log(err));
        content.item.forEach((item, index) => {
            let request = new PostmanRequest(item);
            let script = new KarateBuilder(request);
        });

    });
});
