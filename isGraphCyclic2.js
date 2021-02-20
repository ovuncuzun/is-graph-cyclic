class Vertex {
    visited = false;
    explore = false;
    vertexName = '';

    constructor(name) {
        this.vertexName = name;
    }
}

class Graph {
    adjList;

    initializeGraph(first, second) {
        this.adjList = new Map();
        for (let node in first) {
            this.addVertex(this.getVertex(first[node]));
            this.addEdge(this.getVertex(first[node]), this.getVertex(second[node]));
        }
    }

    addVertex(v) {
        if (!this.adjList.get(v)) {
            this.adjList.set(v, []);
        }
    }

    getVertex(vertex) {
        for (let key of this.adjList.keys()) {
            if (key.vertexName === vertex) {
                return key;
            } else {
                for (let value of this.adjList.get(key)) {
                    if (value.vertexName === vertex) {
                        return value;
                    }
                }
            }
        }
        return new Vertex(vertex);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
    }

    cyclicGraphDetection() {
        let vertices = this.adjList.keys();
        for (let vertex of vertices) {
            if (!vertex.visited) {
                let cycleDetected = this.dfsCycleDetect(vertex);
                if (cycleDetected) return true;
            }
        }
        return false;
    }

    dfsCycleDetect(vertex) {
        if (vertex.visited) return false;
        if (vertex.explore) return true;
        vertex.explore = true;
        let neighbors = this.adjList.get(vertex);
        if (neighbors) {
            for (let neighbor of neighbors) {
                if (!neighbor.visited) {
                    let cycleDetected = this.dfsCycleDetect(neighbor);
                    if (cycleDetected) return true;
                }
            }
        }

        vertex.explore = false;
        vertex.visited = true;
        return false;
    }
}

let g = new Graph();

g.initializeGraph([1, 1, 2, 4, 4, 5, 5, 6], [2, 4, 3, 3, 5, 3, 6, 4]);
console.log(g.cyclicGraphDetection()); // return true

g.initializeGraph([1, 1, 2, 4, 4, 5, 5, 6], [2, 4, 3, 3, 5, 3, 6, 3]);
console.log(g.cyclicGraphDetection()); // return false


g.initializeGraph([4, 2, 3, 1], [2, 3, 1, 4]);
console.log(g.cyclicGraphDetection()); // return true
g.initializeGraph([2, 1, 3, 4], [3, 2, 1, 3]);
console.log(g.cyclicGraphDetection()); // return true
g.initializeGraph([3, 4, 2, 1], [1, 3, 4, 2]);
console.log(g.cyclicGraphDetection()); // return true
g.initializeGraph([3, 4, 2, 1], [1, 3, 4, 5]);
console.log(g.cyclicGraphDetection()); // return false
g.initializeGraph([1, 2, 2, 4, 5, 6, 6], [2, 3, 4, 5, 6, 3, 4]);
console.log(g.cyclicGraphDetection()) // return true
g.initializeGraph([1, 2, 2, 4, 4, 5, 6], [2, 3, 4, 5, 6, 6, 3]);
console.log(g.cyclicGraphDetection()) // return false
g.initializeGraph(['A', 'A', 'A', 'B', 'D', 'E', 'E', 'C', 'C'], ['B', 'D', 'E', 'C', 'E', 'F', 'C', 'F', 'A'])
console.log(g.cyclicGraphDetection()) // return true
g.initializeGraph(['A', 'A', 'A', 'B', 'D', 'E', 'E', 'C'], ['B', 'D', 'E', 'C', 'E', 'F', 'C', 'F'])
console.log(g.cyclicGraphDetection()) // return false




