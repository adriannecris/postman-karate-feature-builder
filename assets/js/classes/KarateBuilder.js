class KarateBuilder {

    constructor(postmanRequest, config = null) {
        console.log(this.toKarateScript(postmanRequest));

    }

    toKarateScript(postmanRequest) {
        let { name, method, headers, url } = postmanRequest;
        let script = [];
        script.push(`Feature: ${name} \n`);
        script.push(this.insertTab(`Scenario: ${name}`, 1));
        script.push(...this.interpretURL(url));
        script.push(this.insertTab(`When method ${method.toLowerCase()}`, 2));
        return script.join("\n");
    }

    interpretURL({ protocol, host = [], path = [], query = [] }) {
        let url = [];
        let baseUrl = `${protocol}://${host.join(".")}`;
        url.push(this.insertTab(`Given '${baseUrl}'`, 2));
        if (path) url.push(this.insertTab(`and path '${path.join('/')}'`, 2));
        if (query) url.push(...query.map(({ key, value }) => this.insertTab(`And param ${key} = '${value}'`, 2)));
        return url;
    }

    interpretHeaders(headers = []) {
        return headers.map(({ key, value, type }) => {

        });
    }

    insertTab(string, count) {
        return "\t".repeat(count) + string;
    }


}