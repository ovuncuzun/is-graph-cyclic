class Graph {
    adjList = {}

    initializeGraph(first, second) {
        this.adjList = {}

        for (let node in first) {
            this.addVertex(first[node]);
            this.addEdge(first[node], second[node]);
        }
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) {
            this.adjList[vertex] = []
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjList[vertex1].push(vertex2)
    }

    detectCycle() {
        const graphNodes = Object.keys(this.adjList);
        for (let n of graphNodes) {
            const queue = [[n, []]];
            while (queue.length) {
                const [node, visited] = queue.shift();
                if (!(node in this.adjList)) continue;
                if (visited.includes(node)) {
                    return true;
                }
                visited.push(node);
                queue.push(...this.adjList[node].map(a => [a, [...visited]]));
            }
        }

        return false;
    }
}


const graph = new Graph()

graph.initializeGraph([4, 2, 3, 1], [2, 3, 1, 4]);
console.log(graph.detectCycle()); // return true
graph.initializeGraph([2, 1, 3, 4], [3, 2, 1, 3]);
console.log(graph.detectCycle()); // return true
graph.initializeGraph([3, 4, 2, 1], [1, 3, 4, 2]);
console.log(graph.detectCycle()); // return true
graph.initializeGraph([3, 4, 2, 1], [1, 3, 4, 5]);
console.log(graph.detectCycle()); // return false

graph.initializeGraph([1, 2, 2, 4, 4, 5, 6], [2, 3, 4, 5, 6, 6, 3]);
console.log(graph.detectCycle()); // return false

graph.initializeGraph([1, 2, 2, 4, 5, 6, 6], [2, 3, 4, 5, 6, 3, 4]);
console.log(graph.detectCycle()); // return true

graph.initializeGraph(['A', 'A', 'A', 'B', 'D', 'E', 'E', 'C', 'C'], ['B', 'D', 'E', 'C', 'E', 'F', 'C', 'F', 'A'])
console.log(graph.detectCycle()) // return true
graph.initializeGraph(['A', 'A', 'A', 'B', 'D', 'E', 'E', 'C'], ['B', 'D', 'E', 'C', 'E', 'F', 'C', 'F'])
console.log(graph.detectCycle()) // return false

