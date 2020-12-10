class PostmanRequest {

    constructor(item) {
        this.toBean(item);

    }

    toBean(item) {
        let { name } = item;
        let { method, header, url } = item.request;
        this.name = name;
        this.method = method;
        this.headers = header;
        this.url = url;
        this.fileName = this.generateFeatureFileName(name);
    }

    generateFeatureFileName(name) {
        let mutated = name;
        mutated = mutated.replaceAll(" ", "_");
        return mutated + ".feature";
    }
}