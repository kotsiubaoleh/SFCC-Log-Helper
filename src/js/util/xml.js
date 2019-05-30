const parser = new DOMParser();

const nodePrototype = {
    length() {
        return this.selection.length;
    },
    toString() {
        const element = this.selection[0];
        if (element instanceof Document) {
            return element.firstElementChild.outerHTML 
        } else {
            return this.selection[0].innerHTML;
        }
    },
    text() {
        return this.toString();
    },
    attr(attrName) {
        const element = this.selection[0];
        if (!attrName) {
            return element.attributes;
        } else {
            return element.getAttribute ? element.getAttribute(attrName) : null;
        }
    },
    [Symbol.iterator]() {
        const iterator = this.selection[Symbol.iterator]();
        return {
            next() {
                let {value, done} = iterator.next();
                const node = createXMLNode([value]);
                return {
                    value: new Proxy(node, {get: getHandler}),
                    done
                }
            }
        }
    }
}

function selectFromChildren(elem, tag) {
    const result = [];
    for (let child of elem.children) {
        if (child.nodeName === tag) {
            result.push(child);
        }
    }
    return result;
}

function createXMLNode(selection) {
    const node = function () {return};
    Object.setPrototypeOf(node, nodePrototype);
    delete node.length;
    node.selection = selection; 
    return node;
}

function getHandler (target, prop) {
    const targetElement = target.selection[0];
    if (!targetElement) {
        return null;
    }
    let selection = null;
    if (typeof prop === 'symbol') {
        selection = target.selection;
    } else if (!isNaN(Number(prop))) {
        selection = [target.selection[prop]]
    } else {
        selection = selectFromChildren(targetElement, prop);
    }
    const node = createXMLNode(selection);
    function applyHandler (callTarget, thisArg, parameters) {
        return target[prop](...parameters);
    }
    return new Proxy(node, {get: getHandler, apply: applyHandler});
}

export default class XML {
    constructor(input) {
        const dom = parser.parseFromString(input, 'application/xml');
        const rootNode = createXMLNode([dom]);
        return new Proxy(rootNode, {get: getHandler});
    }
}
