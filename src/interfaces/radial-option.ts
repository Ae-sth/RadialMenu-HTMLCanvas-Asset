export namespace RadialOptionN {

    export interface TransientOptionI {

        unfolded: boolean;
        label: string;
        
        parentOption: TransientOptionI | null
        subOptions: (TransientOptionI | TerminalOptionI)[]
    }

    export interface TerminalOptionI {
        selected: boolean;
        label: string;
        handler: Function;
        
        parentOption: TransientOptionI | null
    }
}