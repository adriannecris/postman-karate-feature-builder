$(document).ready(() => {
    let fileInput = $("#file-selector");
    $(fileInput).change(function (event) {
        event.preventDefault();
        let fileList = event.currentTarget.files;
        console.log(fileList[0])

    });
});
