
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
    }

    isEmpty() {
        return this.root === null
    }

    addLeft(node, F) {
        if (this.isEmpty()) {
            this.root = new Node(F);
            this.root.left = new Node(node)
            return
        } else {
            var aux = this.root  //raiz actual
            this.root = new Node(F);
            this.root.left = aux;
            return
        }

    }

    addRight(node) {
        this.root.right = new Node(node);
    }

    add(value) {
        // si el arbol no tiene elementos
        if (this.isEmpty()) {
            this.root = new Node(value)
            return
        }

        var aux = this.root

        while (aux) {
            // vamos hacia la izquierda
            if (value < aux.value) {
                if (aux.left) {
                    aux = aux.left
                } else {
                    aux.left = new Node(value)
                    return
                }
            } else { // vamos hacia la derecha
                if (aux.right) {
                    aux = aux.right
                } else {
                    aux.right = new Node(value)
                    return
                }
            }
        }
    }

    find(value) {
        if (this.isEmpty()) {
            return null
        }

        var aux = this.root
        if (aux.value === value) {
            return aux
        }

        while (aux) {
            if (aux.value === value) {
                break
            }
            if (aux.value < value) {
                aux = aux.right
            } else if (aux.value > value) {
                aux = aux.left
            }
        }
        return aux
    }

    print(node = this.root) {
        if (!node) {
            return
        }
        this.print(node.left)
        console.log(node.value)
        this.print(node.right)
    }
}
module.exports.Tree = Tree;