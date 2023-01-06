import { GeometryN } from "src/interfaces/geometry";
import { RadialMenuN } from "src/interfaces/radial-menu";
import { RootOption } from "../components/index.js";
import { RadialOptionN } from "src/interfaces/radial-option.js";
import { SceneN } from "src/interfaces/scene.js";

export class RadialMenu implements RadialMenuN.RadialMenuI {
    
    public static scene: SceneN.SceneT;
    public static config: (RadialOptionN.TerminalOptionConfigT | RadialOptionN.TransientOptionConfigT)[];
    public static action: Function | null = null;


    
    public static bind<S extends SceneN.SceneT>(scene: S){
        RadialMenu.scene = scene
    }

    public static load(config: RadialMenuN.ConfigT){
        RadialMenu.config =  config 
    }
    
    public static handleLongPressEvent(eventPosition: GeometryN.PointT){
        RadialMenu.scene.context.canvas.addEventListener("mousemove", handleMoveEvent, false)
        RadialMenu.scene.context.canvas.addEventListener("mouseup", handleReleaseEvent, false)

        console.log(`Long-press registered at [${eventPosition}]`)
        const menu = new RadialMenu(eventPosition)
        
        menu.init()

        function handleMoveEvent(event: MouseEvent){
            const eventPosition = [event.clientX-RadialMenu.scene.cursor_offset, event.clientY-RadialMenu.scene.cursor_offset] as [number, number]

            console.log(`Move to [${eventPosition}]`)
            RadialMenu.scene.render()
            menu.update(eventPosition)

        }
        
        function handleReleaseEvent(event: MouseEvent){
            const eventPosition = [event.clientX-RadialMenu.scene.cursor_offset, event.clientY-RadialMenu.scene.cursor_offset] as [number, number]

            RadialMenu.scene.context.canvas.removeEventListener("mousemove", handleMoveEvent, false)
            RadialMenu.scene.context.canvas.removeEventListener("mouseup", handleReleaseEvent, false)

            console.log("Release")
            menu.exec()
            RadialMenu.scene.render()
        }
    }

    
    rootPosition: GeometryN.PointT;
    rootOption: RootOption;

    constructor(eventPosition: GeometryN.PointT){
        this.rootPosition = eventPosition
        this.rootOption = new RootOption({ subOptions: RadialMenu.config }, eventPosition).buildSubOptions()
        
    }

    
    private render(){
        this.rootOption
            .render()

    }

    public init(){
        this.render()
    }
    
    public update(cursorPosition: GeometryN.PointT){
        this.rootOption.process(cursorPosition)
        this.render()

    }
    
    public exec(){
        if(RadialMenu.action)
            RadialMenu.action()
        
        RadialMenu.action = null
    }

}