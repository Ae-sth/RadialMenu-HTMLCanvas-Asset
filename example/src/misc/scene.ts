export default class Scene {
    
    public static context: CanvasRenderingContext2D
    public static cursor_offset = 8

    public static argumentSelectionStack = [1, 2]

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
    
    }
}