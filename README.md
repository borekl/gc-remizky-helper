# GC8GHG5 and GC8GJW0 Solution Helper Web Application

Web application written to help with solving mystery geocaches
GC8GHG5 "Remízky" and GC8GJW0 "Remízky II aneb Fata morgána".
Both seem to use the same encoding table, which is useful as
two sets of encoded coordinates provide more data than one.

## The Puzzle

In both listings there is the same 16×16 matrix with seemingly
random numbers ranging from 0 to 9. The coordinates given are
two 7-tuples (one for N and E each) of integers that fit within
<0;255> interval. Additionally, some of the numbers in the matrix
are noticeable smaller -- purpose of this is unknown to me, but
these numbers are displayed in bold in the application. Bottom
left corner is labelled as "IN", bottom right corner is labelled
as "OUT".

The puzzle contains a hint, that refers to place at N 50°40.194',
E 14°1.993'. What kind of clue this is supposed to provide is unknown
to me. My guess it has something to do with the house no. 10 with
its checker patter of balconies.

## Assumed Solution

Given the above, my primary assumption is that the task is to
find an oriented path between the IN and OUT squares. This will
result in a vector of 256 numbers that are then used to decode
the coordinates. The application is designed to help with that task.

Note, that I haven't yet solved the puzzle, so the whole thing might
be going down the wrong path entirely.

## The Application

The application presents the matrix from the listing to user, who
can paint a path over it with a mouse. The matrix can be switched
between viewing the source numbers and numbers making the path sequence.
Use can use buttons below to switch the view, clear the whole path or
remove the last element.

Above there are the encoded coordinates with decoded values that
instantly update as path is drawn over the matrix.

Left column gives some additional statistics.
