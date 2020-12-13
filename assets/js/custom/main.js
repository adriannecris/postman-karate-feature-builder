$(document).ready(() => {
    let fileInput = $("#file-selector");
    let collection = null;
    $(fileInput).change(async function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        let promise = promiseReadJSONFile(fileList[0]);
        await promise.then(({ item }) => collection = item).catch((err) => console.log(err));
        if (collection) {
            loadCollections(collection, "#main");
        }
    });
});
