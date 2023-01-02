import { GeometryN } from "src/interfaces/geometry";
import { RadialMenuN } from "src/interfaces/radial-menu";
import Draw from "../utils/draw.js";
import RootOption from "./options/root.js";
import { RadialOptionN } from "src/interfaces/radial-option.js";

export default class RadialMenu {
    
    public static context: CanvasRenderingContext2D;
    public static config: (RadialOptionN.TerminalOptionConfigT | RadialOptionN.TransientOptionConfigT)[]
    
    rootPosition: GeometryN.PointT;
    root: RootOption;

    constructor(eventPosition: GeometryN.PointT){
        this.rootPosition = eventPosition
        this.root = new RootOption({ subOptions: RadialMenu.config }, eventPosition).buildSubOptions()

    }

    public static bind(context: CanvasRenderingContext2D){
        RadialMenu.context = context
    }

    public static load(config: RadialMenuN.ConfigT){
        RadialMenu.config =  config 
    }
    
    render(){
        
        this.root
            .render()

    }


    init(){
        this.render()
    }
    
    update(cursorPosition: GeometryN.PointT){

        //
        
        this.root.process(cursorPosition)
        this.render()
    }
    
    exec(){


    }

}