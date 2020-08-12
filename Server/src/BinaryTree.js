
class Node {
    constructor(value) {
        this.value = value
        this.right = null
        this.left = null
    }
}

class Tree {
    constructor() {
        this.root = null
        this.output = "";
        this.codes = { "codes": [] };
    }

    isEmpty() {
        return this.root === null
    }

    add(Rnode, Lnode, F, nodeCounter) {
        if (this.isEmpty()) {
            this.root = new Node(F);
            this.root.left = new Node(Lnode);
            this.root.right = new Node(Rnode);
            return
        } else {
            if (Lnode[1] == "N" + nodeCounter.toString()) {
                var aux = this.root  //raiz actual
                this.root = new Node(F);
                this.root.left = aux;
                this.root.right = new Node(Rnode)
                return
            } else {
                var aux = this.root  //raiz actual
                this.root = new Node(F);
                this.root.left = new Node(Lnode);
                this.root.right = aux;
                return
            }

        }

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
            console.log("ROOT: " + node.value);
            console.log("LEFT: " + node.left.value);
            console.log("RIGHT: " + node.right.value + "\n");
            this.print(node.left);
            this.print(node.right);
        }
    }

    readTree(char, node = this.root, output = [], dir = '') {
        if (!node) {
            if (dir == 'left') {
                output.pop();
                output.pop();

            } else if (dir == 'right') {
                output.pop();
            }
            return;

        } else if (node.value[1] == char) {
            var code = "";
            for (var i in output) {
                this.output += output[i].toString();
                code += output[i].toString();
            }
            this.saveCode(char, code);


        } else {
            output.push(0);
            this.readTree(char, node.left, output, 'left');
            output.push(1);
            this.readTree(char, node.right, output, 'right');
        }
    }

    saveCode(char, output) {
        var exist = false;
        for (var i in this.codes["codes"]) {
            if (this.codes["codes"][i]["char"] == char) {
                exist = true;
            }
        }
        console.log(char, output, exist);

        if (exist == false) {
            this.codes["codes"].push({ "code": output, "char": char });
        }
    }
}
module.exports.Tree = Tree;


