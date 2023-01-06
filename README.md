# RadialMenu-HTMLCanvas-Asset
An implementation of the radial menu in HTML5 canvas; the best so far.

# How does it work?
After a long-press a `RadialMenu` object is instantiated and bound the to the position where the long press happened. #positional_menu

If released when no option has been selected, the menu disappears and nothing happens.

Every radial menu invokation should terminate with the selection of a particular action to perform. This suggeted that each *terminal* option should be bound to some handler function which executes at the end of the option selection. To contrast with *transient* option where it will just give you more options to choose from.

A meaningful radial-menu-action is one where the last selection is a *terminal* option. If you release the button while the cursor is on some *transient* option nothing happens and the menu pops off.

# About possible actions

At first, *Terminal* options run argument-less handlers. But for more complex operations, we more dynamic handlers and thus the capacity to pass arguments to them. 

There are about 3 possible approaches to this problem,
1. position-based operations, easiest to implement cause they will take in the `rootPosition` as an argument.
2. operations with listable arguments, possibly the only one which requires some added logic to the option types.
3. Stack-based operations, basically you create a stack structure in the `Scene` class and the handler goes to fetch its arguments from there.