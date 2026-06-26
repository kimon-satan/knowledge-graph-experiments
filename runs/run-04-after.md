# KG Snapshot — 2026-06-26 10:43

**Total nodes:** 76  
**Total relationships:** 151

## Nodes by label

| Label | Count |
|-------|------:|
| System | 24 |
| Concept | 20 |
| Property | 14 |
| Measure | 7 |
| Paragraph | 5 |
| Topic | 3 |
| Person | 3 |

## Relationships by type

| Type | Count |
|------|------:|
| EXTRACTED_FROM | 77 |
| HAS_PROPERTY | 13 |
| PART_OF | 10 |
| USED_FOR | 8 |
| TYPE_OF | 8 |
| PREREQUISITE_OF | 5 |
| DETERMINES | 5 |
| PROCESSED_BY | 4 |
| FACILITATES | 3 |
| SIMILAR_TO | 3 |
| EXAMPLE_OF | 3 |
| AFFECTS | 2 |
| ANALOGOUS_TO | 2 |
| RESULTS_IN | 2 |
| CREATED_BY | 2 |
| MEASURE_OF | 2 |
| WITHOUT_PROPERTY | 1 |
| PROPOSED | 1 |

## Domain → range distribution

| Type | From | To | Count |
|------|------|----|------:|
| AFFECTS | Concept | Topic | 1 |
| AFFECTS | Concept | Measure | 1 |
| ANALOGOUS_TO | System | System | 2 |
| CREATED_BY | System | Person | 2 |
| DETERMINES | System | Concept | 3 |
| DETERMINES | Concept | Property | 1 |
| DETERMINES | Property | Concept | 1 |
| EXAMPLE_OF | System | System | 2 |
| EXAMPLE_OF | Property | Concept | 1 |
| EXTRACTED_FROM | System | Paragraph | 28 |
| EXTRACTED_FROM | Concept | Paragraph | 21 |
| EXTRACTED_FROM | Property | Paragraph | 15 |
| EXTRACTED_FROM | Measure | Paragraph | 7 |
| EXTRACTED_FROM | Topic | Paragraph | 3 |
| EXTRACTED_FROM | Person | Paragraph | 3 |
| FACILITATES | Concept | Topic | 1 |
| FACILITATES | System | System | 1 |
| FACILITATES | System | Concept | 1 |
| HAS_PROPERTY | System | Property | 10 |
| HAS_PROPERTY | Concept | Property | 3 |
| MEASURE_OF | Measure | Property | 2 |
| PART_OF | Concept | System | 5 |
| PART_OF | System | System | 4 |
| PART_OF | Concept | Concept | 1 |
| PREREQUISITE_OF | Measure | Topic | 2 |
| PREREQUISITE_OF | Concept | System | 1 |
| PREREQUISITE_OF | Property | System | 1 |
| PREREQUISITE_OF | Property | Property | 1 |
| PROCESSED_BY | Concept | System | 2 |
| PROCESSED_BY | System | Person | 1 |
| PROCESSED_BY | System | System | 1 |
| PROPOSED | System | Person | 1 |
| RESULTS_IN | System | Property | 1 |
| RESULTS_IN | Concept | Concept | 1 |
| SIMILAR_TO | System | System | 2 |
| SIMILAR_TO | Measure | Measure | 1 |
| TYPE_OF | System | System | 6 |
| TYPE_OF | Topic | Concept | 1 |
| TYPE_OF | Measure | Measure | 1 |
| USED_FOR | System | Concept | 3 |
| USED_FOR | System | Topic | 3 |
| USED_FOR | System | Measure | 1 |
| USED_FOR | System | System | 1 |
| WITHOUT_PROPERTY | System | Concept | 1 |

## Sample triples (up to 3 per type, excluding EXTRACTED_FROM)

### AFFECTS

- **poor choice of pivot** → **Quicksort performance**
  A poorly chosen pivot can lead to unbalanced partitions, slowing down Quicksort significantly.
- **trade-offs** → **Searching**
  Trade-offs between algorithmic strategies influence the performance characteristics encountered in searching.

### ANALOGOUS_TO

- **binary search tree** → **binary search**
  Searching in a binary search tree mirrors binary search on a sorted array by eliminating half the remaining elements at each step through left-right traversal.
- **binary search** → **dictionary lookup**
  Opening near the middle of a dictionary and narrowing down mimics how binary search halves its search interval.

### CREATED_BY

- **Quicksort** → **Tony Hoare**
  Hoare devised and introduced Quicksort in 1959 to efficiently sort words.
- **Dijkstra's algorithm** → **Edsger Dijkstra**
  Edsger Dijkstra first formulated this algorithm in 1956 to find shortest paths in a graph while seated at a café in Amsterdam.

### DETERMINES

- **linked list** → **deletion**
  Deleting nodes in a linked list is governed by pointer updates rather than bulk data movement.
- **linked list** → **insertion**
  In a linked list, operations for adding new nodes rely on pointer adjustments rather than element shifts.
- **array** → **insertion**
  The contiguous layout of arrays means inserting elements requires shifting existing items.

### EXAMPLE_OF

- **Merge sort** → **divide-and-conquer strategy**
  Merge sort also applies divide-and-conquer by splitting the data and merging sorted halves.
- **sorted order** → **precondition**
  Data being in sorted order is a concrete example of the precondition required for binary search.
- **Quicksort** → **divide-and-conquer strategy**
  Quicksort implements the divide-and-conquer paradigm by recursively partitioning and sorting subarrays.

### FACILITATES

- **heap-based priority queue** → **Dijkstra's algorithm**
  Dijkstra's algorithm requires quick access to the next minimum-cost node, which a heap-based priority queue provides, making its frontier extension efficient.
- **binary search tree** → **insertion**
  The structure of a binary search tree allows insertion by following the same search path, making it straightforward to add new elements.
- **asymptotic complexity** → **study of algorithms and data structures**
  The framework of asymptotic complexity provides the foundation for analyzing algorithm efficiency in this field.

### HAS_PROPERTY

- **Merge sort** → **stable**
  Merge sort preserves the original order of equal elements, making it stable.
- **binary search** → **logarithmic behaviour**
  The binary search algorithm halves the search interval at each step, so its running time grows logarithmically with input size.
- **insertion** → **expensive**
  Inserting into an array is costly because elements must be moved to accommodate new items.

### MEASURE_OF

- **Quicksort performance** → **faster in practice**
  Quicksort performance quantifies how its typical speed manifests in real-world scenarios.
- **weight** → **weighted**
  The term 'weight' provides the quantitative value that defines how 'weighted' an edge is.

### PART_OF

- **root** → **heap**
  The root node in a heap always holds the extreme element (maximum or minimum), reflecting the topmost position in the heap structure.
- **search interval** → **binary search**
  Binary search operates on a specific search interval that is successively narrowed to locate the target.
- **interval halving** → **binary search**
  Halving the search interval at each iteration is the core mechanism by which binary search reduces the search space.

### PREREQUISITE_OF

- **computation space** → **study of algorithms and data structures**
  Knowledge of computation space requirements underpins analysis in the study of algorithms and data structures.
- **computation time** → **study of algorithms and data structures**
  Understanding how computation time scales with input size is necessary before studying algorithms and data structures.
- **precondition** → **binary search**
  A precondition, namely that data be sorted, must be met before binary search can be applied correctly.

### PROCESSED_BY

- **target** → **binary search**
  The algorithm uses the target value as input, comparing it against elements to guide the search.
- **element** → **linear scan**
  The linear scan algorithm processes each element sequentially to check if it matches the search target.
- **Russian-to-English machine translation project** → **Tony Hoare**
  Tony Hoare worked on the Russian-to-English machine translation project during his student visit in Moscow, processing its translation tasks.

### PROPOSED

- **Merge sort** → **John von Neumann**
  Von Neumann is credited with the conception of merge sort in 1945.

### RESULTS_IN

- **binary search** → **dramatic improvement**
  Switching from a linear scan to binary search yields a substantial performance gain, particularly on large datasets.
- **comparison** → **interval halving**
  Each comparison rules out one half of the remaining interval, effectively halving the search space.

### SIMILAR_TO

- **array** → **graph**
  While both arrays and graphs are fundamental data structures, an array organizes elements linearly by index, whereas a graph uses arbitrary node-edge connections.
- **time** → **space**
  Time and space are the two primary resources used to analyze an algorithm's efficiency.
- **heap** → **binary search tree**
  Both heaps and binary search trees use a hierarchical tree shape to impose an ordering on stored elements, though they enforce different specific rules.

### TYPE_OF

- **heap** → **tree**
  A heap is also a kind of tree structure, making it a subtype of the broader tree concept.
- **binary search tree** → **tree**
  A binary search tree is a specialized form of a general tree data structure, adding ordering constraints on its nodes.
- **Searching** → **problem**
  Searching is considered a computational problem where an algorithm must locate a target within a dataset.

### USED_FOR

- **Dijkstra's algorithm** → **shortest path problem**
  The primary purpose of Dijkstra's algorithm is to compute the shortest path between two nodes in a graph.
- **Big-O notation** → **asymptotic complexity**
  Big-O notation is the conventional language for expressing asymptotic complexity.
- **heap** → **priority queue**
  Heaps provide an efficient underlying data structure for priority queues by enabling quick access to the highest- or lowest-priority element at the root.

### WITHOUT_PROPERTY

- **Big-O notation** → **constant factors**
  By definition, Big-O notation abstracts away constant multipliers in growth expressions.

