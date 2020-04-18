//Create Stack Class and functions
class Stack {

	//Stack class is contructed with an empty array
	constructor() {
		this.elements = [];
	}
}

//Function to pop an element from a stack and return the popped element
Stack.prototype.pop = function () {

	return this.elements.pop();
}

//Function to push a given element onto the stack
Stack.prototype.push = function (element) {

	this.elements.push(element);
}

//Function that returns the top element from the stack
	//Not used so far
Stack.prototype.peek = function () {

	return this.elements[this.elements.length - 1];
}

//Function that returns the size of the stack
Stack.prototype.size = function () {

	return this.elements.length;
}

//Function that prints the contents of the stack
	//Not used so far except for debugging
Stack.prototype.printStack = function () {

	var str = "";

	for (var i = 0; i < this.elements.length; i++) {
		str += this.elements[i] + " ";
	}
	return str;
}
//Create Stack Class and function -- end


//Create Graph class and functions
class Graph {

	//Graph class is constructed with a given size of vertices and an adjacency list implemented as a map
		//a map object holds key-value pairs and remembers the insertion order of the keys
			//The key will be the vertices, and the values will be the vertex's adjacent vertices
	constructor(noOfVertices) {

		this.noOfVertices = noOfVertices;
		this.AdjList = new Map();
    }
}

//Function that adds a given vertex to the map object as a key 
Graph.prototype.addVertex = function (vertex) {

	this.AdjList.set(vertex, []);
}

//Function that connects two vertices with a directed edge
Graph.prototype.addEdge = function (src, dest) {

	this.AdjList.get(src).push(dest); //gets the src vertex (the key) and pushes the dest vertex onto its value list in the map object, AdjList
}

//Function that prints the graph's adjacency matrix
Graph.prototype.printGraph = function () {

	var get_keys = this.AdjList.keys(); //assigns get_keys the list of keys in the map object, AdjList. So get_keys is assigned the list of vertices used in the graph

	//for each vertex
	for (var i of get_keys) {

		var get_values = this.AdjList.get(i); //get the list of vertices adjacent to the current i vertex
		var conc = ""; //create an empty string

		//for each vertex adjacent to the current i vertex
		for (var j of get_values) {

			conc += j + " "; //add that value to the string with a space
		}

		console.log(i + " -> " + conc); //Print the i vertex and its adjacent vertices
	}
}

//Function that does Topological Sorting by callling the recursive Topological Sorting Utility function
Graph.prototype.topoSort = function () {

	let stack = new Stack(); //create a new stack instance

	//Create a visted array that tells whether or not a vertex has been visited yet
		//initialize each entry to be false
	let visited = new Array(arraySize);
	for (var i = 0; i < arraySize; i++) {
		visited[i] = false;
	}

	//For each vertex in the graph
	for (var i = 0; i < arraySize; i++) {

		//check to see if that vertex has been visitied yet
		if (visited[i] === false) {

			graph.topoSortUtil(i, visited, stack); //if it hasn't been visited yet, call the Topological Sorting Utility function
		}
	}

	//Once it is done going through the vertices of the graph
	//The stack should have the vertices in opposite topological order
	//So we just need to pop them off and print them in the correct order

	//So long as there is something on the stack
	while (stack.size() !== 0) {

		//print the returned vertex being popped off the stack
		console.log(stack.pop());
	}
}

//Function that uses recursion to do topological sorting
	//inputs are:
		//the vertex currently being visited, the visited array, and the stack
Graph.prototype.topoSortUtil = function (vertex, visited, stack) {

	visited[vertex] = true; //mark that the current vertex has been visited

	var adjVertices = this.AdjList.get(vertex); //create a variable that holds the value (list of adjacent vertices) of the given key (vertex) from the map object, AdjList

	//for every value in the list of adjacent vertices
	for (var i of adjVertices) {

		//Check if that adjacent vertices has already been visited
		if (!visited[i]) {

			this.topoSortUtil(i, visited, stack); //if not, call the Topological Sort Utility to go visit that adjacent vertex
        }
	}

	stack.push(vertex); //push the current vertex onto the stack once it hits a dead end (in other words, had no more adjacent vertices to visit)
}
//Create Graph class and function -- end


//Create an instance of a graph randomly 
var arraySize = Math.floor(Math.random() * (11 - 4) + 4); //This will be user choice
var graph = new Graph(arraySize);

for (var i = 0; i < arraySize; i++) {

	graph.addVertex(i);
}
for (var i = 0; i < arraySize; i++) {

	for (var j = i + 1; j < arraySize; j++) {

		if (Math.floor(Math.random() * 101) < 35){

			graph.addEdge(i, j);
        }
    }
}

//Create an instance of a graph randomly -- end

graph.printGraph();
console.log("Topological Sort of Graph");
graph.topoSort();
