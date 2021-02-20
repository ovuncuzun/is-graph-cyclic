class Graph {
    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        this.adjList[vertex] = [];
    }

    addEdge(vertex1, vertex2) {
        this.adjList[vertex1].push(vertex2);
    }

    detectCycle() {
        const graphNodes = Object.keys(this.adjList);
        const visited = {};
        const recStack = {};

        for (let i = 0; i < graphNodes.length; i++) {
            const node = graphNodes[i];
            if (this.detectCycleUtil(node, visited, recStack))
                return 'there is a cycle';
        }
        return 'no cycle';
    }

    detectCycleUtil(vertex, visited, recStack) {
        if (recStack[vertex]) return true;
        if (visited[vertex]) return false;

        visited[vertex] = true;
        recStack[vertex] = true;
        const nodeNeighbors = this.adjList[vertex];

        for (let i = 0; i < nodeNeighbors.length; i++) {
            const currentNode = nodeNeighbors[i];
            console.log('Current Vertex: ', currentNode, 'Parent Vertex: ', vertex);
            if (this.detectCycleUtil(currentNode, visited, recStack)) {
                return true;
            }
        }

        recStack[vertex] = false;
        return false;
    }
}


const graph = new Graph()

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('B', 'D');
graph.addEdge('D', 'E');

console.log(graph.detectCycle()); // no cycle

graph.addEdge('E', 'B');
console.log(graph.detectCycle()); // there is a cycle
