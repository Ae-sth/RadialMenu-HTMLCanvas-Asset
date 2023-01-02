import { GeometryN } from "./geometry";

export namespace RadialOptionN {

    export type TransientOptionConfigT = {

        label: string;  
        subOptions: (TransientOptionConfigT | TerminalOptionConfigT)[]
    }

    export type TerminalOptionConfigT = {
        label: string;
        handler: Function;
    }

    export type RootOptionConfigT = {
        subOptions: (TerminalOptionConfigT | TransientOptionConfigT)[]
    }
        


    export interface RootOptionI {
        getSubOptions: Function
    }
    
    export interface TransientOptionI {

        readonly layer: number;
        
        
        select: Function
        unselect: Function
        readonly selected: boolean
        
        getSubOptions: Function
        
        boundingBox: GeometryN.RadialBoxT
        updateGeometry: Function

        render: Function
        
    }

    export interface TerminalOptionI {


        readonly layer: number
        
        select: Function
        unselect: Function
        readonly selected: boolean
        
        readonly handler: Function
        
        boundingBox: GeometryN.RadialBoxT
        /**
         * To compute this, you need few information, what we know is where the click happened and we can also know where is the option situated. Given that how thick each layer is is fixed, we can compute the four points.
         * 
         */
        updateGeometry: Function

        render: Function
    }
}