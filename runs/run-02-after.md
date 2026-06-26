# KG Snapshot — 2026-06-26 10:23

**Total nodes:** 51  
**Total relationships:** 94

## Nodes by label

| Label | Count |
|-------|------:|
| Property | 15 |
| System | 14 |
| Concept | 11 |
| Paragraph | 5 |
| Topic | 3 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 49 |
| HAS_PROPERTY | 13 |
| TYPE_OF | 7 |
| PART_OF | 4 |
| PREREQUISITE_OF | 2 |
| PROPOSED | 2 |
| SIMILAR_TO | 2 |
| RESULTS_IN | 2 |
| ANALOGOUS_TO | 2 |
| EXAMPLE_OF | 2 |
| CREATED_BY | 2 |
| FACILITATES | 2 |
| DETERMINES | 1 |
| AFFECTS | 1 |
| USED_FOR | 1 |
| PROCESSED_BY | 1 |
| MEASURE_OF | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTS | System | Property | 1 |
| ANALOGOUS_TO | Concept | System | 1 |
| ANALOGOUS_TO | System | Concept | 1 |
| CREATED_BY | System | Person | 2 |
| DETERMINES | Concept | Concept | 1 |
| EXAMPLE_OF | System | Concept | 2 |
| EXTRACTED_FROM | System | Paragraph | 16 |
| EXTRACTED_FROM | Property | Paragraph | 15 |
| EXTRACTED_FROM | Concept | Paragraph | 12 |
| EXTRACTED_FROM | Topic | Paragraph | 3 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| FACILITATES | System | System | 2 |
| HAS_PROPERTY | System | Property | 12 |
| HAS_PROPERTY | System | Concept | 1 |
| MEASURE_OF | Property | Concept | 1 |
| PART_OF | Topic | System | 2 |
| PART_OF | System | Concept | 1 |
| PART_OF | Concept | System | 1 |
| PREREQUISITE_OF | Topic | Concept | 1 |
| PREREQUISITE_OF | Concept | System | 1 |
| PROCESSED_BY | System | System | 1 |
| PROPOSED | Concept | Concept | 1 |
| PROPOSED | System | Person | 1 |
| RESULTS_IN | System | Property | 1 |
| RESULTS_IN | System | System | 1 |
| SIMILAR_TO | System | System | 2 |
| TYPE_OF | System | System | 3 |
| TYPE_OF | System | Topic | 2 |
| TYPE_OF | Concept | Concept | 1 |
| TYPE_OF | Property | Concept | 1 |
| USED_FOR | System | System | 1 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTS

- **Quicksort** → **Poor pivot choice**
  A poor choice of pivot can degrade the performance of Quicksort.

### ANALOGOUS_TO

- **Dictionary lookup** → **Binary search**
  The process of binary search is analogous to looking up a word in a physical dictionary, where one uses a similar method of halving the search space to find the target.
- **Binary Search Tree** → **Binary Search**
  A binary search tree mimics the logarithmic search behavior of binary search by organizing data so that a search can follow a single path.

### CREATED_BY

- **Quicksort** → **Tony Hoare**
  Quicksort was devised by Tony Hoare in 1959 while working on a translation project.
- **Dijkstra's Algorithm** → **Edsger Dijkstra**
  Dijkstra's Algorithm was developed by Edsger Dijkstra in 1956.

### DETERMINES

- **Comparison** → **Logarithmic time**
  The process of comparison in binary search is what allows it to run in logarithmic time, as each comparison halves the search interval.

### EXAMPLE_OF

- **Merge sort** → **Divide-and-conquer**
  Merge sort applies the divide-and-conquer principle by splitting the array, sorting each half, and merging the results.
- **Quicksort** → **Divide-and-conquer**
  Quicksort uses the divide-and-conquer strategy by choosing a pivot, partitioning the array, and recursively sorting the partitions.

### FACILITATES

- **Heap-based Priority Queue** → **Dijkstra's Algorithm**
  The heap-based priority queue allows Dijkstra's Algorithm to efficiently retrieve the next-cheapest node.
- **Priority Queue** → **Dijkstra's Algorithm**
  Priority queues enable Dijkstra's Algorithm to efficiently extend the cheapest frontier first by quickly retrieving the next-cheapest node.

### HAS_PROPERTY

- **Quicksort** → **In-place**
  Quicksort sorts in place, using almost no additional memory.
- **Heap** → **Siblings Unordered**
  In a heap, sibling nodes are not ordered relative to each other, which is part of its structural invariant.
- **Merge sort** → **Extra memory**
  Merge sort requires extra memory proportional to the input size.

### MEASURE_OF

- **Running Time** → **Big-O Notation**
  Running time is often measured using Big-O notation to describe the time complexity of algorithms.

### PART_OF

- **Sorting** → **Merge sort**
  Merge sort is a central algorithm within the broader topic of sorting.
- **Array** → **Time and Space**
  Questions about time and space complexity often begin with simple data structures like arrays.
- **Search interval** → **Binary search**
  The search interval is a fundamental component of binary search, defining the range within which the search is conducted.

### PREREQUISITE_OF

- **Algorithms and Data Structures** → **Asymptotic Complexity**
  Understanding asymptotic complexity is essential for studying algorithms and data structures, as it describes the efficiency of computations.
- **Time and Space** → **Graph**
  Understanding time and space complexity in arrays is foundational for analyzing more complex structures like graphs.

### PROCESSED_BY

- **Dijkstra's Algorithm** → **Graph**
  Dijkstra's Algorithm processes a graph by exploring nodes connected by weighted edges.

### PROPOSED

- **Merge sort** → **John von Neumann**
  The idea of Merge sort is usually credited to John von Neumann in 1945.
- **Asymptotic Complexity** → **Big-O Notation**
  Big-O notation is the conventional way to express asymptotic complexity, focusing on the growth rate and ignoring constant factors.

### RESULTS_IN

- **Binary search** → **Sorted**
  Binary search requires the data to be sorted to function correctly, as it relies on the order to eliminate half of the search space with each comparison.
- **Heapsort** → **Heap**
  Heapsort is derived from the heap structure, utilizing its properties to sort data by building a heap and repeatedly removing the root.

### SIMILAR_TO

- **Array** → **Linked List**
  Both arrays and linked lists are data structures, but they make different trade-offs between access speed and insertion cost.
- **Quicksort** → **Merge sort**
  Both Quicksort and Merge sort are sorting algorithms that use the divide-and-conquer strategy.

### TYPE_OF

- **Big-O Notation** → **Asymptotic Language**
  Big-O notation is a type of asymptotic language used to describe algorithm complexity.
- **Data Structure** → **Array**
  An array is a type of data structure that stores elements in a contiguous block of memory.
- **Binary search** → **Searching**
  Binary search is a more efficient method of searching within a sorted collection by halving the search interval.

### USED_FOR

- **Priority Queue** → **Heap**
  A heap naturally implements a priority queue by always yielding the highest-priority item, which is the root.

