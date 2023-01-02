import { GeometryN } from "src/interfaces/geometry";


export default class Draw {
    public static drawRadialMenuButton(
        context: CanvasRenderingContext2D,
        rootPosition: GeometryN.PointT,
        optionPosition: number,
        optionCount: number,
        optionLayer: number,
        phase: number=optionLayer*Math.PI/7
    ) {
        context.save()
        context.beginPath()

        const offset = 5

        const innerRadius = 30 
        const interiorRadius = 20 + optionLayer*innerRadius + offset/2
        const exteriorRadius = interiorRadius+innerRadius - offset

        const numberOfOptions = optionCount
        const angle = (2*Math.PI)/numberOfOptions            


        const halfAngleInteriorOffset = (offset/2)/interiorRadius
        const halfAngleExteriorOffset = (offset/2)/exteriorRadius

            // compute the bouding boxes
        const innerArc = [
            [rootPosition[0]+interiorRadius*Math.cos((optionPosition-1)*angle+phase+halfAngleInteriorOffset), rootPosition[1]+interiorRadius*Math.sin((optionPosition-1)*angle+phase+halfAngleInteriorOffset)],
            [rootPosition[0]+interiorRadius*Math.cos((optionPosition)*angle+phase-halfAngleInteriorOffset), rootPosition[1]+interiorRadius*Math.sin((optionPosition)*angle+phase-halfAngleExteriorOffset)],
        ] as GeometryN.ArcT
        const outerArc = [
            [rootPosition[0]+exteriorRadius*Math.cos((optionPosition-1)*angle+phase+halfAngleExteriorOffset), rootPosition[1]+exteriorRadius*Math.sin((optionPosition-1)*angle+phase+halfAngleExteriorOffset)],
            [rootPosition[0]+exteriorRadius*Math.cos((optionPosition)*angle+phase-halfAngleExteriorOffset), rootPosition[1]+exteriorRadius*Math.sin((optionPosition)*angle+phase-halfAngleExteriorOffset)],
        ] as GeometryN.ArcT

        const leftSegment = [
            innerArc[1], outerArc[1]
        ] as GeometryN.SegmentT
        const rightSegment = [
            innerArc[0], outerArc[0]
        ] as GeometryN.SegmentT
            
            context.arc(...rootPosition, interiorRadius, (optionPosition-1)*angle+phase+halfAngleInteriorOffset, optionPosition*angle+phase-halfAngleInteriorOffset)
            context.lineTo(...outerArc[1])
            context.arc(...rootPosition, exteriorRadius, optionPosition*angle+phase-halfAngleExteriorOffset, (optionPosition-1)*angle+phase+halfAngleInteriorOffset, true)
            context.lineTo(...innerArc[0])


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
}
