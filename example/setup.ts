import { RadialMenu } from "../src/core/radial-menu.js"
import { GeometryN } from "../src/interfaces/geometry.js"
import { RadialMenuN } from "../src/interfaces/radial-menu.js"
import Scene from "../src/misc/scene.js"
import Icon from "../src/utils/icon.js"

export default async function setup(context: CanvasRenderingContext2D){
    
    Scene.bind(context)
    RadialMenu.bind(Scene)


    const radialMenuConfig: RadialMenuN.ConfigT = [

         {
            label: "equal",
            icon: Icon.plus,
            handler: function(){console.log("equal")}
        },       {
            label: "add",
            handler: function(){console.log("add")}
        },
        {
            label: "more",
            subOptions: [
                {
                    label: "multiply",
                    handler: function(){console.log("multiply")}
                },
                {
                    label: "division",
                    handler: function(){console.log("division")}
                }
            ]
        }
    ] 
    RadialMenu.load(radialMenuConfig)
    
   
    Scene.render()
    
    context.canvas.addEventListener("mousedown", handleClickEvent, false)
    function handleClickEvent(event: MouseEvent){
        const eventPosition = [event.clientX-Scene.cursor_offset, event.clientY-Scene.cursor_offset] as GeometryN.PointT
        const timeout = setTimeout(()=>{
            RadialMenu.handleLongPressEvent(eventPosition)
            clearTimeout(timeout)
        }, 1*1000)
    }

}