import { GeometryN } from "src/interfaces/geometry";
import Geometry from "./geometry.js";


export default class Draw {
    public static drawRadialMenuButton(
        context: CanvasRenderingContext2D,
        rootPosition: GeometryN.PointT,
        optionPosition: number,
        optionCount: number,
        optionLayer: number,
        phase: number=optionLayer*Math.PI/5
    ) {

        const boundingBox = Geometry.radialButtonGeometry(
            rootPosition,
            optionPosition,
            optionCount,
            optionLayer,
            phase
        )
        context.save()
        context.beginPath()
                
        context.arc(...boundingBox.origin, boundingBox.innerRadius, boundingBox.innerAngleRange[1], boundingBox.innerAngleRange[0])
        context.lineTo(
            boundingBox.origin[0] + boundingBox.outerRadius*Math.cos(boundingBox.outerAngleRange[0]),
            boundingBox.origin[1] + boundingBox.outerRadius*Math.sin(boundingBox.outerAngleRange[0]),
             
        )
        context.arc(...boundingBox.origin, boundingBox.outerRadius, boundingBox.outerAngleRange[0], boundingBox.outerAngleRange[1], true)
        context.lineTo(
            boundingBox.origin[0] + boundingBox.innerRadius*Math.cos(boundingBox.innerAngleRange[1]),
            boundingBox.origin[1] + boundingBox.innerRadius*Math.sin(boundingBox.innerAngleRange[1]),
        )


        context.fillStyle = "grey"
        context.fill()
        context.restore()
    }

    public static drawBoundingBox(
        context: CanvasRenderingContext2D,
        boundingBox: GeometryN.RadialBoxT
    ) {

        context.save()
        context.beginPath()
                
        context.arc(...boundingBox.origin, boundingBox.innerRadius, boundingBox.innerAngleRange[1], boundingBox.innerAngleRange[0])
        context.lineTo(
            boundingBox.origin[0] + boundingBox.outerRadius*Math.cos(boundingBox.outerAngleRange[0]),
            boundingBox.origin[1] + boundingBox.outerRadius*Math.sin(boundingBox.outerAngleRange[0]),
             
        )
        context.arc(...boundingBox.origin, boundingBox.outerRadius, boundingBox.outerAngleRange[0], boundingBox.outerAngleRange[1], true)
        context.lineTo(
            boundingBox.origin[0] + boundingBox.innerRadius*Math.cos(boundingBox.innerAngleRange[1]),
            boundingBox.origin[1] + boundingBox.innerRadius*Math.sin(boundingBox.innerAngleRange[1]),
        )


        context.strokeStyle = "black"
        context.lineWidth = 2
        context.stroke()
        context.restore()
    }

    // 
    public static drawDot(
        context: CanvasRenderingContext2D,
        position: GeometryN.PointT
    ) {


        context.save()
    
        // styling
        context.fillStyle = "white";
        context.lineWidth = 2;

        context.strokeStyle = 'black';
        
        // drawing
        context.beginPath();
        context.arc(...position, 2, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();

        context.restore()
    }
}
