function promiseReadJSONFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileContent = null;
        let postman = null;
        reader.onload = function (event) {
            fileContent = event.target.result;
            try {
                postman = JSON.parse(fileContent);
                resolve(postman);
            } catch (e) {
                reject(e.message);
            }
        };
        reader.readAsText(file);
    });
}