import RadialMenu from "./components/radial-menu.js"
import { GeometryN } from "./interfaces/geometry.js"
import { RadialMenuN } from "./interfaces/radial-menu.js"
import Scene from "./misc/scene.js"

export default async function setup(context: CanvasRenderingContext2D){
    
    RadialMenu.bind(context)
    const radialMenuConfig: RadialMenuN.ConfigT = [

         {
            label: "equal",
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
    
    Scene.bind(context)
    Scene.render()
    
    const cursor_offset = 8

    context.canvas.addEventListener("mousedown", handleClickEvent, false)
    function handleClickEvent(event: MouseEvent){
        const eventPosition = [event.clientX-cursor_offset, event.clientY-cursor_offset] as [number, number]
        const timeout = setTimeout(()=>{
            handleLongPressEvent(eventPosition)
            clearTimeout(timeout)
        }, 1*1000)
    }
    function handleLongPressEvent(eventPosition: GeometryN.PointT){
        context.canvas.addEventListener("mousemove", handleMoveEvent, false)
        context.canvas.addEventListener("mouseup", handleReleaseEvent, false)

        console.log(`Long-press registered at [${eventPosition}]`)
        const menu = new RadialMenu(eventPosition)
        
        menu.init()

        function handleMoveEvent(event: MouseEvent){
            const eventPosition = [event.clientX-cursor_offset, event.clientY-cursor_offset] as [number, number]

            console.log(`Move to [${eventPosition}]`)
            Scene.render()
            menu.update(eventPosition)

        }
        
        function handleReleaseEvent(event: MouseEvent){
            const eventPosition = [event.clientX-cursor_offset, event.clientY-cursor_offset] as [number, number]

            context.canvas.removeEventListener("mousemove", handleMoveEvent, false)
            context.canvas.removeEventListener("mouseup", handleReleaseEvent, false)

            console.log("Release")
            menu.exec()
            Scene.render()
        }
    }

}