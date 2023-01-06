import Icon from "../utils/icon.js"
import Draw from "../utils/draw.js"
import { SceneN } from "src/interfaces/scene.js"

export default class Scene {
    
    public static context: CanvasRenderingContext2D
    public static cursor_offset = 8

    public static bind(context: CanvasRenderingContext2D){
        Scene.context = context    
    }

    private static clear(){
        Scene.context
            .clearRect(0, 0, Scene.context.canvas.width, Scene.context.canvas.height)
    }
    
    public static render(){

        Scene.clear()
        const context = Scene.context

        const canvas_center_x = context.canvas.width/2
        const canvas_center_y = context.canvas.height/2

        Icon.plus(
            context,
            [canvas_center_x, canvas_center_y],
            0,
            100
        )
    
        function render_scene(){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.save()
            context.translate(
                canvas_center_x,
                canvas_center_y
            )
            
    
            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(100,0)
            context.stroke()  
            context.restore()
    
        }
        
        //render_scene()
    }
}