# How does it work?

After a long-press a `RadialMenu` object is instantiated and bound the to the position where the long press happened. #positional_menu

If released when no option has been selected, the menu disappears and nothing happens.

Every radial menu invokation should terminate with the selection of a particular action to perform. This suggeted that each *terminal* option should be bound to some handler function which executes at the end of the option selection. To contrast with *transient* option where it will just give you more options to choose from.

```typescript
interface RootOption {}

interface TransientOption {

    unfolded: boolean;
    label: string;
    
    parentOption: TransientOption | RootOption
    subOptions: (TransientOption | TerminalOption)[]
}

interface TerminalOption {
    selected: boolean;
    label: string;
    handler: Function;
    
    parentOption: TransientOption | RootOption
}
```

A meaningful radial-menu-action is one where the last selection is a *terminal* option. If you release the button while the cursor is on some *transient* option nothing happens and the menu pops off.


---

I can locally know the (layer, number) info at creation by checking the parent attribute and how deep in goes and of course the number is given at creation since it is gonna be a list.
