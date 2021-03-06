class PostmanRequest {

    constructor(item) {
        this.toBean(item);

    }

    toBean(item) {
        let { name } = item;
        let { method, header, url, body, auth = null } = item.request;
        this.name = name;
        this.method = method;
        this.headers = header;
        this.url = url;
        this.auth = auth;
        this.body = body;
        this.fileName = this.generateFeatureFileName(name);
    }

    generateFeatureFileName(name) {
        let mutated = name;
        mutated = mutated.replaceAll(" ", "_");
        return mutated.trim();
    }
}