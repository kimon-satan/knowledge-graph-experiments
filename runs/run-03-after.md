# KG Snapshot — 2026-06-26 10:31

**Total nodes:** 50  
**Total relationships:** 90

## Nodes by label

| Label | Count |
|-------|------:|
| System | 18 |
| Property | 13 |
| Concept | 8 |
| Paragraph | 5 |
| Topic | 3 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 47 |
| HAS_PROPERTY | 14 |
| TYPE_OF | 5 |
| SIMILAR_TO | 4 |
| PART_OF | 3 |
| USED_FOR | 3 |
| ANALOGOUS_TO | 2 |
| EXAMPLE_OF | 2 |
| CREATED_BY | 2 |
| FACILITATES | 2 |
| PROCESSED_BY | 1 |
| RESULTS_IN | 1 |
| DETERMINES | 1 |
| AFFECTS | 1 |
| PROPOSED | 1 |
| PREREQUISITE_OF | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTS | System | Property | 1 |
| ANALOGOUS_TO | System | System | 1 |
| ANALOGOUS_TO | System | Concept | 1 |
| CREATED_BY | System | Person | 1 |
| CREATED_BY | Person | System | 1 |
| DETERMINES | Concept | Concept | 1 |
| EXAMPLE_OF | System | Concept | 2 |
| EXTRACTED_FROM | System | Paragraph | 20 |
| EXTRACTED_FROM | Property | Paragraph | 13 |
| EXTRACTED_FROM | Concept | Paragraph | 8 |
| EXTRACTED_FROM | Topic | Paragraph | 3 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| FACILITATES | System | System | 2 |
| HAS_PROPERTY | System | Property | 11 |
| HAS_PROPERTY | System | Concept | 3 |
| PART_OF | Topic | System | 2 |
| PART_OF | Concept | Concept | 1 |
| PREREQUISITE_OF | Topic | Concept | 1 |
| PROCESSED_BY | System | Concept | 1 |
| PROPOSED | System | Person | 1 |
| RESULTS_IN | System | Property | 1 |
| SIMILAR_TO | System | System | 4 |
| TYPE_OF | System | System | 3 |
| TYPE_OF | System | Topic | 2 |
| USED_FOR | System | System | 2 |
| USED_FOR | Concept | System | 1 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTS

- **Quicksort** → **Poor pivot choice**
  A poor pivot choice in Quicksort can lead to degraded performance, making the algorithm less efficient.

### ANALOGOUS_TO

- **Binary search** → **Physical dictionary lookup**
  Binary search is analogous to looking up a word in a physical dictionary, where one uses the middle point to decide the direction of the search.
- **Binary Search Tree** → **Binary Search**
  A binary search tree mimics the logarithmic behaviour of binary search by allowing searches to follow a single path down the tree.

### CREATED_BY

- **Quicksort** → **Tony Hoare**
  Tony Hoare devised the Quicksort algorithm in 1959 to efficiently sort words for a translation project.
- **Edsger Dijkstra** → **Dijkstra's algorithm**
  Edsger Dijkstra developed the algorithm for finding the shortest path between two points in a graph.

### DETERMINES

- **Comparison** → **Logarithmic time**
  The efficiency of binary search in logarithmic time is determined by the fact that each comparison halves the remaining search space.

### EXAMPLE_OF

- **Merge sort** → **Divide-and-conquer strategy**
  Merge sort uses the divide-and-conquer strategy by splitting the collection, sorting each half, and merging the results.
- **Quicksort** → **Divide-and-conquer strategy**
  Quicksort exemplifies the divide-and-conquer strategy by choosing a pivot, partitioning the data, and recursively sorting the partitions.

### FACILITATES

- **Heap** → **Heapsort**
  The heap structure allows for the Heapsort algorithm to be implemented by building a heap from data and repeatedly removing the root.
- **Priority Queue** → **Dijkstra's algorithm**
  Priority queues allow Dijkstra's algorithm to efficiently extend the cheapest frontier first by quickly retrieving the next-cheapest node.

### HAS_PROPERTY

- **Sorting methods** → **Big-O notation**
  The running time of sorting methods is often described using Big-O notation.
- **Array** → **Constant-Time Access**
  Arrays allow constant-time access to any element by index due to their contiguous memory layout.
- **Heap** → **Siblings Unordered**
  In a heap, sibling nodes are not ordered relative to each other, allowing flexibility in their arrangement.

### PART_OF

- **Big-O notation** → **Asymptotic language**
  Big-O notation is a component of the asymptotic language used to describe algorithmic complexity.
- **Sorting** → **Quicksort**
  Quicksort is a central algorithm within the broader topic of sorting.
- **Sorting** → **Merge sort**
  Merge sort is a key algorithm within the field of sorting.

### PREREQUISITE_OF

- **Algorithms and Data Structures** → **Asymptotic Complexity**
  Understanding asymptotic complexity is essential for studying algorithms and data structures, as it helps evaluate their efficiency.

### PROCESSED_BY

- **Binary search** → **Search interval**
  Binary search operates by repeatedly halving the search interval to efficiently locate the target element.

### PROPOSED

- **Merge sort** → **John von Neumann**
  John von Neumann is credited with proposing the idea of merge sort in 1945.

### RESULTS_IN

- **Binary search** → **Sorted**
  Binary search requires the data to be sorted to function correctly, as it relies on the order to eliminate half of the search space with each step.

### SIMILAR_TO

- **Quicksort** → **Merge sort**
  Both Quicksort and Merge sort are sorting algorithms using the divide-and-conquer strategy, but they differ in their approach and properties.
- **Heap** → **Binary Search Tree**
  Both the heap and binary search tree are tree structures that organize data to facilitate efficient operations, though they maintain different invariants.
- **Array** → **Graph**
  Both arrays and graphs are data structures, but graphs are a far richer structure compared to arrays.

### TYPE_OF

- **Linear scan** → **Searching**
  Linear scan is a basic method used in searching to find an element by inspecting each one sequentially.
- **Heap-based priority queue** → **Priority Queue**
  A heap-based priority queue is a specific implementation of a priority queue using a heap structure.
- **Data Structure** → **Linked List**
  A linked list is a type of data structure that organizes elements in a sequence of nodes, each pointing to the next.

### USED_FOR

- **Heap** → **Priority Queue**
  A heap is used as the natural implementation of a priority queue, allowing it to efficiently yield the highest-priority item.
- **Asymptotic Complexity** → **Big-O Notation**
  Asymptotic complexity is expressed using Big-O notation to describe the growth rate of an algorithm's resource requirements.
- **Graph** → **Dijkstra's algorithm**
  Dijkstra's algorithm is used to explore graphs by finding the shortest path between nodes.

