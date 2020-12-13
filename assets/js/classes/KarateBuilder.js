class KarateBuilder {


    toKarateScript(postmanRequest) {
        let { name, method, headers = [], body = null, url, auth = null } = postmanRequest;
        let script = [];
        script.push(`Feature: ${name} \n`);
        script.push(this.insertTab(`Scenario: ${name}`, 1));
        script.push(...this.interpretURL(url));
        if (auth) {
            let encoded = this.interpretAuth(auth);
            if (encoded) script.push(encoded);
        }
        if (headers.length > 0) script.push(...this.interpretHeaders(headers));
        if (body) script.push(...this.interpretBody(body));
        script.push(this.insertTab(`When method ${method.toLowerCase()}`, 2));
        return script;
    }

    interpretURL({ protocol, host = [], path = [], query = [] }) {
        let url = [];
        let baseUrl = `${protocol}://${host.join(".")}`;
        url.push(this.insertTab(`Given '${baseUrl}'`, 2));
        if (path) url.push(this.insertTab(`And path '${path.join('/')}'`, 2));
        if (query) url.push(...query.map(({ key, value }) => this.insertTab(`And param ${key} = '${value}'`, 2)));
        return url;
    }


    interpretHeaders(headers = []) {
        return headers.map(({ key, value, type }) => {
            return this.insertTab(`And header ${key} = '${value}'`, 2);
        });
    }

    interpretBody(body = null) {
        if (body && body.raw) {
            return [
                this.insertTab("And request ", 2),
                this.insertTab(`"""`, 2),
                this.cleanRaw(body.raw),
                this.insertTab(`"""`, 2)
            ]
        }

        return null
    }

    cleanRaw(raw) {
        let clean = raw.split("\n");
        if (clean.length > 0) {
            return clean.map(line => {
                return this.insertTab(line, 2);
            }).join("\n");
        }
        return raw;
    }

    interpretAuth(auth) {
        switch (auth.type) {
            case 'bearer':
                if (auth.bearer && auth.bearer.length > 0) {
                    let { value } = auth.bearer[0];
                    return this.insertTab(`And header Authorization = 'Bearer ${value}'`, 2)
                }
                return null;
            case 'basic':
                if (auth.basic && auth.basic.length > 1) {
                    let { key: key1, val: val1 } = auth.basic[0];
                    let { key: key2, val: val2 } = auth.basic[1];
                    let username = key1 === "username" ? val1 : val2;
                    let password = key1 === "password" ? val1 : val2;
                    let encoded = btoa(username + ":" + password);
                    return this.insertTab(`And header Authorization = '${encoded}'`, 2)
                }
                return null;
            default:
                return null;
        }
    }

    insertTab(string, count) {
        return "\t".repeat(count) + string;
    }


}