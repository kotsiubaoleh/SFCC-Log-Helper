const sax = require('sax');

const PROTOCOL = 'https://';
const PATH = {
    ROOT_DIR: '/on/demandware.servlet/webdav/Sites/Logs'
}
const MAPPING = {
    LOG_FILE: {
        href: 'path',
        creationdate: 'creationDate',
        getlastmodified: 'lastModDate',
        displayname: 'name',
        getetag: 'etag',
        getcontentlength: 'size',
        getcontenttype: 'contentType'
    }
}

function makeStreamIterable(stream) {
    const reader = stream.getReader();

    return {
        next() {
            return reader.read();
        },
        return() {
            return reader.releaseLock();
        },
        [Symbol.asyncIterator]() {
            return this;
        }
    }
}

async function parseDirectoryResponse(stream) {
    const parser = sax.parser({
        lowercase: true
    });
    const files = [];
    let index = 0;
    let currentFileObject;
    let currentTagName;

    parser.onopentag = function({name}) {
        switch (name) {
            case 'response':
                currentFileObject = {
                    isDirectory: false
                };
                files[index] = currentFileObject;
                break;
            case 'collection':
                    if(currentTagName === 'resourcetype') {
                        currentFileObject.isDirectory = true;
                    }
                break;
        }
        currentTagName = name;            
    }

    parser.onclosetag = function(name) {
        switch (name) {
            case 'response': 
                index++;
                break;
        }
        if (currentTagName === name) {
            currentTagName = null;
        }
    }

    parser.ontext = function(text) {
        const prop = MAPPING.LOG_FILE[currentTagName]
        if (prop) {
            if (prop === 'lastModDate' || prop === 'creationDate') {
                currentFileObject[prop] = new Date(text);
            } else {
                currentFileObject[prop] = text;
            }
        }
    }

    const decoder = new TextDecoder();
    for await (let chunk of makeStreamIterable(stream)) {
        parser.write(decoder.decode(chunk));
    }

    parser.close();
    
    return files;
}

export default class WebDAVClient{
    constructor({domain, login, password}) {
        this.headers = new Headers({
            'Authorization': 'Basic ' + btoa(login + ':' + password),
            'Depth': 1,
        });
        this.domain = domain;
    }

    async fetchRootDir() {
        const response = await fetch(PROTOCOL + this.domain + PATH.ROOT_DIR, { method: "PROPFIND", headers: this.headers });
        const files = await parseDirectoryResponse(response.body);
        return files;
    }

    async fetchFileContent(path, progressCallback) {
        const response = await fetch(PROTOCOL + this.domain + path, { method: "GET", headers: this.headers });
        if (!progressCallback) {
            return await response.text();
        } else {
            const stream = makeStreamIterable(response.body);
            const chunks = [];
            let downloadedSize = 0;
            for await (let chunk of stream) {
                chunks.push(chunk);
                downloadedSize += chunk.length;
                progressCallback(downloadedSize);
            }
            const totalSize = chunks.reduce((size, chunk) => size + chunk.length, 0);
            const responseData = new Uint8Array(totalSize);
            let processedSize = 0;
            for (let chunk of chunks) {
                responseData.set(chunk, processedSize);
            }
            return new TextDecoder().decode(responseData);
        }
    }
}