# KG Snapshot — before relationship schema update

**Total nodes:** 54  
**Total relationships:** 98

## Nodes by label

| Label | Count |
|-------|------:|
| Property | 16 |
| System | 15 |
| Concept | 11 |
| Paragraph | 5 |
| Topic | 4 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 51 |
| HAS_PROPERTY | 15 |
| PART_OF | 5 |
| TYPE_OF | 4 |
| AFFECTED_BY | 4 |
| CREATED_BY | 4 |
| WITHOUT_PROPERTY | 3 |
| PROCESSED_BY | 2 |
| ANALOGOUS_TO | 2 |
| EXAMPLE_OF | 2 |
| CONTAINS | 1 |
| RESULT_OF | 1 |
| AFFECTS | 1 |
| SIMILAR_TO | 1 |
| RESULTS_IN | 1 |
| FACILITATES | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTED_BY | System | Property | 1 |
| AFFECTED_BY | System | System | 1 |
| AFFECTED_BY | Concept | Concept | 1 |
| AFFECTED_BY | Concept | System | 1 |
| AFFECTS | Concept | Concept | 1 |
| ANALOGOUS_TO | System | Concept | 2 |
| CONTAINS | Concept | System | 1 |
| CREATED_BY | System | Person | 3 |
| CREATED_BY | System | System | 1 |
| EXAMPLE_OF | System | Concept | 2 |
| EXTRACTED_FROM | System | Paragraph | 17 |
| EXTRACTED_FROM | Property | Paragraph | 16 |
| EXTRACTED_FROM | Concept | Paragraph | 11 |
| EXTRACTED_FROM | Topic | Paragraph | 4 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| FACILITATES | System | System | 1 |
| HAS_PROPERTY | System | Property | 14 |
| HAS_PROPERTY | System | Concept | 1 |
| PART_OF | System | Topic | 2 |
| PART_OF | Topic | System | 2 |
| PART_OF | System | System | 1 |
| PROCESSED_BY | System | Concept | 1 |
| PROCESSED_BY | System | System | 1 |
| RESULTS_IN | System | Concept | 1 |
| RESULT_OF | System | Property | 1 |
| SIMILAR_TO | System | System | 1 |
| TYPE_OF | System | System | 3 |
| TYPE_OF | Concept | Concept | 1 |
| WITHOUT_PROPERTY | Property | Property | 2 |
| WITHOUT_PROPERTY | System | Property | 1 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTED_BY

- **Dijkstra's Algorithm** → **Priority queue**
  Dijkstra's Algorithm requires a priority queue to efficiently find the next node to explore based on cost.
- **Quicksort** → **Poor choice of pivot**
  A poor choice of pivot in Quicksort can degrade its performance significantly.
- **Time and Space** → **array**
  Time and space complexity questions initially arose in the context of arrays before being applied to graphs.

### AFFECTS

- **Comparison** → **Search interval**
  The comparison determines which half of the search interval can be discarded in binary search.

### ANALOGOUS_TO

- **Binary search tree** → **Binary search**
  The binary search tree mimics the behaviour of binary search by allowing efficient path-based searches.
- **Binary search** → **Dictionary lookup**
  Binary search is analogous to looking up a word in a dictionary by opening to the middle and deciding which direction to continue searching.

### CONTAINS

- **asymptotic complexity** → **Big-O notation**
  Asymptotic complexity is expressed using Big-O notation, which describes how the runtime or space requirements of an algorithm grow with input size.

### CREATED_BY

- **Quicksort** → **Tony Hoare**
  Quicksort was devised by Tony Hoare in 1959 while working on a machine translation project.
- **Merge sort** → **John von Neumann**
  The idea of merge sort is usually credited to John von Neumann in 1945.
- **Heapsort** → **Heap**
  Heapsort is derived directly from the heap structure, using its properties to sort data.

### EXAMPLE_OF

- **Quicksort** → **Divide-and-conquer**
  Quicksort is an example of the divide-and-conquer strategy, which involves breaking a problem into smaller subproblems, solving each one independently, and combining the results.
- **Merge sort** → **Divide-and-conquer**
  Merge sort also uses the divide-and-conquer strategy, splitting the collection in half, sorting each half, and merging the results.

### FACILITATES

- **Heap-based Priority Queue** → **Dijkstra's Algorithm**
  The heap-based priority queue allows Dijkstra's Algorithm to efficiently extend the cheapest frontier first.

### HAS_PROPERTY

- **Heap** → **Ordered with respect to children**
  In a heap, each parent node is ordered relative to its children, ensuring the heap property is maintained.
- **Binary search tree** → **Cheap insertion**
  The design of the binary search tree allows for efficient addition of elements, making insertion operations cheap.
- **Merge sort** → **Stable**
  Merge sort is stable, meaning it preserves the original order of equal elements.

### PART_OF

- **Sorting** → **Merge sort**
  Merge sort is a key algorithm in the study of sorting, showcasing the divide-and-conquer approach.
- **Sorting** → **Quicksort**
  Quicksort is a central method within the topic of sorting, illustrating the application of divide-and-conquer.
- **Linear scan** → **Searching**
  Linear scan is a basic method used in the process of searching through a collection.

### PROCESSED_BY

- **Binary search** → **Comparison**
  Binary search involves comparing the target against the middle element to decide which half of the search interval to discard.
- **Dijkstra's Algorithm** → **Graph**
  The algorithm operates on a graph, exploring nodes and edges to find the shortest path.

### RESULTS_IN

- **Binary search tree** → **Logarithmic behaviour**
  The structure of a binary search tree enables searches that follow a single path, mimicking the logarithmic efficiency of binary search.

### RESULT_OF

- **Binary search** → **Sorted**
  Binary search requires the data to be sorted in order to function correctly.

### SIMILAR_TO

- **Quicksort** → **Merge sort**
  Both Quicksort and Merge sort are sorting algorithms that use the divide-and-conquer strategy, though they differ in their implementation and properties.

### TYPE_OF

- **data structure** → **linked list**
  A linked list is a type of data structure where elements are linked using pointers, allowing for efficient insertions and deletions.
- **Heap-based Priority Queue** → **Priority queue**
  A heap-based priority queue is a specific implementation of a priority queue using a heap data structure.
- **data structure** → **array**
  An array is a specific type of data structure used to store elements in a contiguous block of memory.

### WITHOUT_PROPERTY

- **Binary search** → **Proportional time**
  Unlike linear scan, binary search does not run in time proportional to the length of the collection; it runs in logarithmic time.
- **constant-time access** → **slow access**
  Arrays provide constant-time access to elements, unlike linked lists which require traversal for access.
- **costly insertion** → **cheap insertion and deletion**
  Arrays have costly insertion due to shifting elements, whereas linked lists have cheap insertion by updating pointers.

