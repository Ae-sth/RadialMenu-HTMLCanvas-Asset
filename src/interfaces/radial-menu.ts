import { GeometryN } from "./geometry";
import { RadialOptionN } from "./radial-option";

export namespace RadialMenuN {

    /**
     * Configuration object to build the radial menu. Different configuration build different menus.
     * @note to change this goto `RadialOptionN.RootOptionConfigT`.
     */
    export type ConfigT = 
        RadialOptionN.RootOptionConfigT["subOptions"]

    /**
     * A simple radial menu.
     */
    export interface RadialMenuI {

        /**
         * Contains the position where the radial menu was created.
         */
        rootPosition: GeometryN.PointT;

        /**
         * Container of all radial buttons.
         */
        rootOption: RadialOptionN.RootOptionI;

        /**
         * Builds the radial menu at the root position
         * @returns void
         */
        init: ()=>void;

        /**
         * Update the state of the radial menu based on the position of the cursor with respect to the root position.
         * @param cursorPosition position of the mouse during the long-press
         * @returns void
         */
        update: (cursorPosition: GeometryN.PointT)=>void;

        /**
         * Executes action (or does nothing) based on the last position of the cursor
         */
        exec: ()=>void
    }
}