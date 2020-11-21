$(document).ready(() => {
    let fileInput = $("#file-selector");
    $(fileInput).change(async function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        let promise = promiseReadJSONFile(fileList[0]);
        let content = null;
        await promise.then((pm) => content = pm).catch((err) => console.log(err));
        console.log(content)

    });
});
