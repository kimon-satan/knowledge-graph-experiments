# KG Snapshot — 2026-06-26 10:55

**Total nodes:** 88  
**Total relationships:** 176

## Nodes by label

| Label | Count |
|-------|------:|
| Concept | 26 |
| System | 25 |
| Property | 17 |
| Measure | 8 |
| Paragraph | 5 |
| Topic | 4 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 88 |
| PART_OF | 22 |
| HAS_PROPERTY | 13 |
| TYPE_OF | 12 |
| USED_FOR | 8 |
| FACILITATES | 6 |
| RESULTS_IN | 5 |
| AFFECTS | 4 |
| MEASURE_OF | 3 |
| CREATED_BY | 3 |
| EXAMPLE_OF | 2 |
| DETERMINES | 2 |
| ANALOGOUS_TO | 2 |
| WITHOUT_PROPERTY | 2 |
| SIMILAR_TO | 2 |
| PREREQUISITE_OF | 1 |
| PROCESSED_BY | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTS | Measure | Measure | 2 |
| AFFECTS | Concept | Topic | 1 |
| AFFECTS | Concept | Measure | 1 |
| ANALOGOUS_TO | Concept | System | 1 |
| ANALOGOUS_TO | System | System | 1 |
| CREATED_BY | System | Person | 3 |
| DETERMINES | Property | System | 1 |
| DETERMINES | Property | Property | 1 |
| EXAMPLE_OF | System | Concept | 2 |
| EXTRACTED_FROM | Concept | Paragraph | 28 |
| EXTRACTED_FROM | System | Paragraph | 28 |
| EXTRACTED_FROM | Property | Paragraph | 17 |
| EXTRACTED_FROM | Measure | Paragraph | 8 |
| EXTRACTED_FROM | Topic | Paragraph | 4 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| FACILITATES | System | System | 2 |
| FACILITATES | System | Concept | 2 |
| FACILITATES | Property | Property | 1 |
| FACILITATES | Concept | Topic | 1 |
| HAS_PROPERTY | System | Property | 11 |
| HAS_PROPERTY | Concept | Property | 2 |
| MEASURE_OF | Measure | Property | 2 |
| MEASURE_OF | Property | Measure | 1 |
| PART_OF | Concept | System | 9 |
| PART_OF | System | System | 6 |
| PART_OF | System | Topic | 3 |
| PART_OF | Concept | Topic | 3 |
| PART_OF | Concept | Concept | 1 |
| PREREQUISITE_OF | Property | System | 1 |
| PROCESSED_BY | System | System | 1 |
| RESULTS_IN | System | Concept | 2 |
| RESULTS_IN | System | Property | 1 |
| RESULTS_IN | System | System | 1 |
| RESULTS_IN | Concept | Concept | 1 |
| SIMILAR_TO | System | System | 2 |
| TYPE_OF | System | Concept | 6 |
| TYPE_OF | System | System | 3 |
| TYPE_OF | Measure | Concept | 2 |
| TYPE_OF | Concept | Concept | 1 |
| USED_FOR | System | Topic | 2 |
| USED_FOR | System | System | 2 |
| USED_FOR | Concept | Topic | 1 |
| USED_FOR | System | Measure | 1 |
| USED_FOR | Concept | System | 1 |
| USED_FOR | Concept | Measure | 1 |
| WITHOUT_PROPERTY | Concept | Property | 2 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTS

- **Poor pivot choice** → **Runtime performance**
  Choosing a suboptimal pivot can negatively influence the running time of Quicksort, causing degraded performance.
- **trade-offs** → **Searching**
  Algorithmic trade-offs directly influence the challenges and choices involved in searching for an element.
- **input size** → **time complexity**
  The size of a computation’s input determines how long the computation takes, so as input size grows, time complexity increases accordingly.

### ANALOGOUS_TO

- **tree search** → **binary search**
  Searching in a binary search tree is structurally analogous to binary search in a sorted array, as both halve the remaining search space at each step.
- **binary search** → **physical dictionary**
  Looking up a word in a physical dictionary mirrors binary search by opening near the middle and then deciding which half of the pages to focus on next.

### CREATED_BY

- **Dijkstra's algorithm** → **Edsger Dijkstra**
  Dijkstra's algorithm was developed by Edsger Dijkstra in 1956 to efficiently compute shortest paths in graphs.
- **Quicksort** → **Tony Hoare**
  Conceived by Tony Hoare in 1959 while he was a visiting student in Moscow.
- **Merge sort** → **John von Neumann**
  Merge sort is attributed to John von Neumann, who described this method in 1945.

### DETERMINES

- **heap invariant** → **heap**
  The heap is defined by its invariant condition; without the parent-child ordering rule, the structure would not function as a heap.
- **sorted order** → **logarithmic time**
  The guarantee of logarithmic running time depends on data being sorted; without sorted order, the halving process cannot be applied correctly.

### EXAMPLE_OF

- **Merge sort** → **Divide-and-conquer strategy**
  Merge sort applies the divide-and-conquer approach by recursively splitting and merging subarrays to achieve sorted order.
- **Quicksort** → **Divide-and-conquer strategy**
  Quicksort exemplifies the divide-and-conquer strategy by selecting a pivot, partitioning the dataset, and recursively sorting the partitions.

### FACILITATES

- **binary search tree** → **tree search**
  The ordering of keys in the left and right subtrees enables searches to descend a single path instead of scanning all elements.
- **Quicksort** → **Russian-to-English machine translation project**
  Quicksort enabled Tony Hoare’s translation project by providing an efficient method to sort words for dictionary lookup.
- **binary search tree** → **insertion**
  The tree structure allows new elements to be inserted by following key ordering to a leaf position in logarithmic time on average.

### HAS_PROPERTY

- **Quicksort** → **In-place**
  Quicksort is an in-place algorithm that requires minimal additional memory.
- **Merge sort** → **Extra memory proportional to input**
  Merge sort’s merging phase requires extra space proportional to the size of the input array.
- **insertion in the middle** → **cheap**
  Linked lists allow middle insertions via simple pointer updates, avoiding the need to move large blocks of memory.

### MEASURE_OF

- **Runtime performance** → **Fast runtime**
  Runtime performance measures how quickly Quicksort completes sorting tasks.
- **Memory usage** → **Extra memory proportional to input**
  Memory usage quantifies how much additional space merge sort allocates relative to the input size.
- **linear time** → **length of the collection**
  Linear time quantifies running time in terms of the length of the collection being scanned.

### PART_OF

- **weighted edge** → **graph**
  Weighted edges are the connections in a graph that carry cost or distance information between nodes.
- **root** → **heap**
  The root of a heap always holds the extreme (maximum or minimum) element according to the heap invariant.
- **insertion in the middle** → **array**
  Insertion in the middle is an operation performed on an array where a new element is placed between existing elements.

### PREREQUISITE_OF

- **sorted order** → **binary search**
  Binary search requires the data to be in sorted order; without that precondition, halving the search range cannot guarantee correctness.

### PROCESSED_BY

- **graph** → **Dijkstra's algorithm**
  Dijkstra's algorithm operates on a graph by exploring its nodes and edges to determine shortest paths.

### RESULTS_IN

- **comparison** → **halving**
  Each comparison in binary search determines which half of the interval to discard, effectively halving the remaining range.
- **binary search tree** → **logarithmic behaviour**
  By directing each search to one subtree at each node, the binary search tree achieves the same O(log n) search behaviour as binary search on arrays.
- **priority queue** → **highest-priority item**
  Each remove operation on the priority queue yields the element with the highest priority at that moment.

### SIMILAR_TO

- **graph** → **array**
  Graphs and arrays are both data structures, though graphs use nodes and edges while arrays use contiguous indexed storage.
- **searching methods** → **sorting methods**
  Both searching and sorting methods are fundamental algorithmic procedures, the former locating elements and the latter organizing them.

### TYPE_OF

- **array** → **data structure**
  An array is a basic type of data structure, characterized by its simple, contiguous layout.
- **sorting methods** → **algorithmic method**
  Sorting methods are algorithmic procedures designed to order elements within data structures.
- **heap-based priority queue** → **priority queue**
  A heap-based priority queue is an implementation variant of the priority queue data structure using a heap to manage priorities efficiently.

### USED_FOR

- **Merge sort** → **Sorting**
  Merge sort is likewise used as a fundamental technique for sorting collections.
- **heap** → **Heapsort**
  Heapsort builds a heap from the input and then uses the heap structure to extract elements in order to sort the data.
- **Big-O notation** → **growth rate**
  Big-O notation is the conventional system used to express a procedure’s growth rate, abstracting away constant factors and lower-order terms.

### WITHOUT_PROPERTY

- **asymptotic complexity** → **constant factors**
  By definition, asymptotic complexity analysis ignores constant multiplicative factors when characterizing performance growth.
- **asymptotic complexity** → **lower-order terms**
  Asymptotic complexity also discards lower-order terms so that only the dominant growth behavior remains.

