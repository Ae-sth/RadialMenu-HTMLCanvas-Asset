import RadialMenu from "./components/radial-menu.js"

export default async function setup(context: CanvasRenderingContext2D){

    const canvas_center_x = context.canvas.width/2
    const canvas_center_y = context.canvas.height/2

    context.translate(
        canvas_center_x,
        canvas_center_y
    )
    

    context.beginPath()
    context.moveTo(0,0)
    context.lineTo(100,0)
    context.stroke()
    

    context.canvas.addEventListener("mousedown", handleClickEvent, false)
    function handleClickEvent(event: MouseEvent){
        const eventPosition = [event.clientX, event.clientY] as [number, number]
        
        const timeout = setTimeout(()=>{
            handleLongPressEvent(eventPosition)
            clearTimeout(timeout)
        }, 1*1000)
    }
    function handleLongPressEvent(eventPosition: [number, number]){
        context.canvas.addEventListener("mousemove", handleMoveEvent, false)
        context.canvas.addEventListener("mouseup", handleReleaseEvent, false)

        console.log(`Long-press registered at [${eventPosition}]`)
        const menu = new RadialMenu([], eventPosition)

        function handleMoveEvent(event: MouseEvent){
            const eventPosition = [event.clientX, event.clientY] as [number, number]

            console.log("Move")
            menu.update(eventPosition)

        }
        
        function handleReleaseEvent(event: MouseEvent){
            const eventPosition = [event.clientX, event.clientY] as [number, number]

            context.canvas.removeEventListener("mousemove", handleMoveEvent, false)
            context.canvas.removeEventListener("mouseup", handleReleaseEvent, false)

            console.log("Release")
            menu.exec()
        }
    }
}