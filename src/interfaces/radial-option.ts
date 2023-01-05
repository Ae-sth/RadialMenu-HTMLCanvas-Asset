import RootOption from "src/components/options/root";
import TransientOption from "src/components/options/transient";
import { GeometryN } from "./geometry";

export namespace RadialOptionN {

    // Configuration types

    type OptionConfigT = {
        label: string;  
        icon?: Function;
    }

    export type TransientOptionConfigT = OptionConfigT & {
        subOptions: (TransientOptionConfigT | TerminalOptionConfigT)[]
    }

    export type TerminalOptionConfigT = OptionConfigT & {
        handler: Function;
    }

    export type RootOptionConfigT = {
        subOptions: (TerminalOptionConfigT | TransientOptionConfigT)[]
    }
        
    // Options interfaces

    /**
     * Common interface between Terminal and Transient options. 
     */
    export interface OptionI {

        /**
         * Contains configuration to build each button type.
         */
        config: Partial<RootOptionConfigT & TransientOptionConfigT & TerminalOptionConfigT>

        /**
         * Contains the layer position of the option within the radial geometry. 
         * Useful for both generating suboptions if there is and locating the current option.
         */
        readonly layer: number;
        
        /**
         * Turns on the selection flag on the option once the mouse enters its bounding box.
         * @returns void
         */
        select: ()=>void

        /**
         * Turns off the selection flag on the option once the mouse enters its bounding box.
         * @returns void
         */
        unselect: ()=>void

        /**
         * Flag for selection status.
         */
        readonly selected: boolean

        /**
         * Contains the geometry of the button.
         * Useful for both rendering the button and detect if events are on it.
         */
        boundingBox: GeometryN.RadialBoxT

        /**
         * Builds the geoemtry of the button at instantiation time based on the origin position and parent's option count and layer.
         */
        updateGeometry: (origin: GeometryN.PointT)=>OptionI

        
    }

    /**
     * Common interface between the Root and Transient options.
     */
    interface OptionContainerI {
        /**
         * Uses the suboption configuration given at instantiation time to instantiate suboptions.
         * This process is initiated by the root option and then generate all specified buttons.
         * @returns TransientOption
         */
        buildSubOptions: ()=>TransientOption | RootOption

        /**
         * Handles events that potentially modify the visual state of the radial menu.
         * Coordinate these change with the internal state.
         * @param eventPosition GeometryN.PointT
         * @returns void
         */
        process: (eventPosition: GeometryN.PointT)=>void

        /**
         * Draws the button on the scene. May call render on the suboptions as well.
         * @returns void
         */
        render: ()=>void
    }
    
    /**
     * Container of other options 
     */
    export interface TransientOptionI extends OptionI, OptionContainerI {}

    /**
     * Options that execute
     */
    export interface TerminalOptionI extends OptionI { 
        
        /**
         * Contains the logic to execute when the option is selected
         */
        readonly handler: Function

        /**
         * Draws the button on the scene
         * @returns void
         */
        render: Function
    }

    /**
     * It serves no purpose but being the origin of the option tree.
     */
    export interface RootOptionI extends OptionContainerI {

        /**
         * Useful to denote that we are at the origin of layers, null.
         * Keep in mind that layers start at 0. 
         */
        readonly layer: null

    }
}