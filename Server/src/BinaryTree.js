
class Node {
    constructor(value) {
        this.value = value
        this.right = null
        this.left = null
        this.prev = null
    }
}

class Tree {
    constructor() {
        this.root = null
        this.nodes = [];
        this.output = "";
        this.charCodes = { "codes": [] };
    }

    isEmpty() {
        return this.root === null
    }

    print(node = this.root) {
        if (!node) {
            return

        } else if (!node.right && !node.left) {
            console.log("ROOT: " + node.value);
            console.log("LEFT: null");
            console.log("RIGHT: null\n");

        } else if (!node.right) {
            console.log("ROOT: " + node.value);
            console.log("LEFT: " + node.left.value);
            console.log("RIGHT: null\n");
            this.print(node.left);

        } else if (!node.left) {
            console.log("ROOT: " + node.value);
            console.log("LEFT: null");
            console.log("RIGHT: " + node.right.value + "\n");
            this.print(node.right);

        } else {
            if (node.prev) {
                console.log("PREV: " + node.prev.value);
            }
            console.log("ROOT: " + node.value);
            console.log("LEFT: " + node.left.value);
            console.log("RIGHT: " + node.right.value + "\n");
            this.print(node.left);
            this.print(node.right);
        }
    }

    addByText(R, L, F) {
        if (this.isEmpty()) {
            this.root = new Node(F);
            this.root.left = new Node(L);
            this.root.right = new Node(R);
            this.root.left.prev = this.root;
            this.root.right.prev = this.root;
            this.nodes.push(this.root);
            return
        }
        for (var i in this.nodes) {
            var node = new Node(F);
            for (var j in this.nodes) {
                if ((R[1] == this.nodes[i].value[1] && L[1] == this.nodes[j].value[1]) || (L[1] == this.nodes[i].value[1] && R[1] == this.nodes[j].value[1])) {
                    node.right = this.nodes[i];
                    node.left = this.nodes[j];
                    node.left.prev = node;
                    node.right.prev = node;
                    this.root = node;
                    this.nodes.push(node);
                    return;
                }
            }
            if (R[1] == this.nodes[i].value[1]) {
                node.left = new Node(L);
                node.right = this.nodes[i];
                node.left.prev = node;
                node.right.prev = node;
                this.nodes.push(node);
                this.root = node;
                return;

            } else if (L[1] == this.nodes[i].value[1]) {
                node.left = this.nodes[i];
                node.right = new Node(R);
                node.left.prev = node;
                node.right.prev = node;
                this.nodes.push(node);
                this.root = node;
                return
            }
        }
        var node = new Node(F);
        node.left = new Node(L);
        node.right = new Node(R);
        node.left.prev = node;
        node.right.prev = node;
        this.nodes.push(node);
        this.root = node;
        return
    }

    addByCode(charCode, char, nodeCounter) {
        if (this.isEmpty()) {
            this.root = new Node("N" + nodeCounter);
        }
        var position = this.root;

        for (var i in charCode) {
            if (charCode[i] == 1) {

                if (!position.right && i == charCode.length - 1) {
                    position.right = new Node(char);
                    return;
                } else if (!position.right) {
                    position.right = new Node("N" + nodeCounter);
                    position = position.right;
                } else {
                    position = position.right;
                }

            } else if (charCode[i] == 0) {

                if (!position.left && i == charCode.length - 1) {
                    position.left = new Node(char);
                    return;
                } else if (!position.left) {
                    position.left = new Node("N" + nodeCounter);
                    position = position.left;
                } else {
                    position = position.left;
                }
            }
        }
    }

    readTreeByText(char, node = this.root, output = [], dir = '') {
        if (node) {
            if (node.value[1] == char) {
                var charOutput = this.generateCharCode(node);
                this.output += charOutput;
                this.saveCode(char, charOutput);

            } else {
                this.readTreeByText(char, node.left, output, 'left');
                this.readTreeByText(char, node.right, output, 'right');
            }
        }
    }

    generateCharCode(node) {
        var charCode = "";
        while (node != this.root) {
            if (node.prev.left.value[1] == node.value[1]) {
                charCode += "0";
            } else if (node.prev.right.value[1] == node.value[1]) {
                charCode += "1";
            }
            node = node.prev;
        }
        return charCode.split("").reverse().join("");
    }

    saveCode(char, output) {
        var exist = false;
        for (var i in this.charCodes["codes"]) {
            if (this.charCodes["codes"][i]["char"] == char) {
                exist = true;
            }
        }

        if (exist == false) {
            this.charCodes["codes"].push({ "code": output, "char": char });
        }
    }

    readTreeByCode(textCode, node = this.root) {
        var text = "";
        for (var i in textCode) {
            if (node) {
                if (textCode[i] == "1") {
                    if (!node.right.right) {
                        text += node.right.value;
                        node = this.root;
                    } else {
                        node = node.right;
                    }
                } else if (textCode[i] == "0") {
                    if (!node.left.left) {
                        text += node.left.value;
                        node = this.root;
                    } else {
                        node = node.left;
                    }
                }
            }
        } return text;
    }
}
module.exports.Tree = Tree;


