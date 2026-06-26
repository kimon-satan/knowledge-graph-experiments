# KG Snapshot — before relationship schema update

**Total nodes:** 52  
**Total relationships:** 95

## Nodes by label

| Label | Count |
|-------|------:|
| System | 17 |
| Property | 17 |
| Concept | 7 |
| Paragraph | 5 |
| Topic | 3 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 49 |
| HAS_PROPERTY | 18 |
| TYPE_OF | 6 |
| SIMILAR_TO | 4 |
| PART_OF | 3 |
| USED_FOR | 2 |
| RESULTS_IN | 2 |
| EXAMPLE_OF | 2 |
| CREATED_BY | 2 |
| PROPOSED | 2 |
| PREREQUISITE_OF | 1 |
| ANALOGOUS_TO | 1 |
| DETERMINES | 1 |
| AFFECTS | 1 |
| PROCESSED_BY | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTS | System | Property | 1 |
| ANALOGOUS_TO | System | Concept | 1 |
| CREATED_BY | System | Person | 2 |
| DETERMINES | Property | Concept | 1 |
| EXAMPLE_OF | System | Concept | 2 |
| EXTRACTED_FROM | System | Paragraph | 19 |
| EXTRACTED_FROM | Property | Paragraph | 17 |
| EXTRACTED_FROM | Concept | Paragraph | 7 |
| EXTRACTED_FROM | Topic | Paragraph | 3 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| HAS_PROPERTY | System | Property | 14 |
| HAS_PROPERTY | System | Concept | 3 |
| HAS_PROPERTY | Concept | Property | 1 |
| PART_OF | Topic | System | 2 |
| PART_OF | System | System | 1 |
| PREREQUISITE_OF | Topic | Concept | 1 |
| PROCESSED_BY | System | System | 1 |
| PROPOSED | System | Person | 1 |
| PROPOSED | Concept | System | 1 |
| RESULTS_IN | System | Property | 1 |
| RESULTS_IN | System | System | 1 |
| SIMILAR_TO | System | System | 3 |
| SIMILAR_TO | System | Concept | 1 |
| TYPE_OF | System | System | 3 |
| TYPE_OF | System | Topic | 2 |
| TYPE_OF | Concept | Concept | 1 |
| USED_FOR | Concept | System | 1 |
| USED_FOR | System | System | 1 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTS

- **Quicksort** → **Poor choice of pivot**
  A poor choice of pivot in Quicksort can degrade its performance significantly.

### ANALOGOUS_TO

- **Binary search** → **Analogy to dictionary lookup**
  The process of binary search is similar to looking up a word in a dictionary by narrowing down the search space.

### CREATED_BY

- **Quicksort** → **Tony Hoare**
  Tony Hoare devised the Quicksort algorithm in 1959 while working on a machine translation project.
- **Dijkstra's algorithm** → **Edsger Dijkstra**
  Edsger Dijkstra developed the algorithm in 1956 to find the shortest path between two points in a graph.

### DETERMINES

- **Sorted** → **Logarithmic time**
  The sorted order of data is necessary for binary search to achieve logarithmic time complexity.

### EXAMPLE_OF

- **Merge sort** → **Divide-and-conquer**
  Merge sort applies the divide-and-conquer principle by splitting the data, sorting each half, and merging the results.
- **Quicksort** → **Divide-and-conquer**
  Quicksort uses the divide-and-conquer strategy by choosing a pivot, partitioning the data, and recursively sorting the partitions.

### HAS_PROPERTY

- **Binary Search Tree** → **Cheap Insertion**
  Binary search trees allow for efficient insertion of elements, maintaining their logarithmic time complexity.
- **Binary search** → **Logarithmic time**
  Binary search operates in logarithmic time because it halves the search space with each step.
- **Heap** → **Ordered with Respect to Children**
  In a heap, each parent node is ordered in relation to its children, ensuring that the largest or smallest value is at the root.

### PART_OF

- **Sorting** → **Quicksort**
  Quicksort is a central algorithm within the topic of sorting.
- **Sorting** → **Merge sort**
  Merge sort is a key algorithm within the topic of sorting.
- **Priority Queue** → **Heap**
  Heaps are commonly used to implement priority queues, as they efficiently manage and retrieve the highest-priority items.

### PREREQUISITE_OF

- **Algorithms and Data Structures** → **Asymptotic Complexity**
  Understanding asymptotic complexity is essential for analyzing how algorithms and data structures perform as input size grows.

### PROCESSED_BY

- **Dijkstra's algorithm** → **Graph**
  The algorithm explores a graph by extending the cheapest frontier first to find the shortest path.

### PROPOSED

- **Asymptotic language** → **Dijkstra's algorithm**
  The running time of Dijkstra's algorithm is expressed in Big-O notation, which is part of the asymptotic language.
- **Merge sort** → **John von Neumann**
  John von Neumann is credited with proposing the merge sort algorithm in 1945.

### RESULTS_IN

- **Heapsort** → **Heap**
  Heapsort is derived from the heap structure, utilizing its properties to sort data.
- **Binary search** → **Sorted**
  Binary search requires the data to be sorted to function correctly, as it relies on comparing middle elements.

### SIMILAR_TO

- **Binary Search Tree** → **Binary Search**
  Binary search trees and binary search both utilize a logarithmic approach to efficiently locate elements.
- **Quicksort** → **Merge sort**
  Both Quicksort and Merge sort use the divide-and-conquer strategy to sort data.
- **Array** → **Linked List**
  Both arrays and linked lists are data structures, but they make different trade-offs between access speed and insertion cost.

### TYPE_OF

- **Data Structure** → **Linked List**
  A linked list is a type of data structure, offering different trade-offs compared to an array.
- **Linear scan** → **Searching**
  Linear scan is a basic method used in searching where elements are checked sequentially.
- **Binary search** → **Searching**
  Binary search is a more efficient method used in searching, particularly when the data is sorted.

### USED_FOR

- **Asymptotic Complexity** → **Big-O Notation**
  Asymptotic complexity is conventionally written in Big-O notation to describe the growth rate of a procedure.
- **Dijkstra's algorithm** → **Heap-based priority queue**
  The algorithm uses a heap-based priority queue to efficiently extend the cheapest frontier first.

