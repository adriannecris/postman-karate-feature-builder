$(document).ready(() => {
    let fileInput = $("#file-selector");
    $(fileInput).change(async function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        let promise = promiseReadJSONFile(fileList[0]);
        await promise.then(({ item }) => _postman_collection = item).catch((err) => console.log(err));
        if (_postman_collection) {
            loadCollections("#main");
        }
    });
});
