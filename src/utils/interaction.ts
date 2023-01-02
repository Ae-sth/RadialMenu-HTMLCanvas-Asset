import { GeometryN } from "src/interfaces/geometry";

export default class Interaction {
    public static isWithin(point: GeometryN.PointT, boundingBox: GeometryN.RadialBoxT, layer: number, phase: number=layer*Math.PI/5){
        
        const relativePosition = [
            (point[0]-boundingBox.origin[0]),
            (point[1]-boundingBox.origin[1])
        ]

        const radius = Math.sqrt(
            relativePosition[0]**2 + relativePosition[1]**2
        )

        let angle = Math.atan2(
            Math.abs(relativePosition[1]),
            Math.abs(relativePosition[0])
        )
        
        switch(true){
            case (relativePosition[1] > 0 && relativePosition[0] > 0):
                break;
            case (relativePosition[1] > 0 && relativePosition[0] < 0):
                angle = Math.PI - angle
                break;
            case (relativePosition[1] < 0 && relativePosition[0] > 0):
                angle = 2*Math.PI - angle
                break;
            case (relativePosition[1] < 0 && relativePosition[0] < 0):
                angle = Math.PI + angle
                break;
        }

        angle = angle + phase
        return (
            (radius > boundingBox.innerRadius && radius < boundingBox.outerRadius) // radius cond
            && (angle > boundingBox.outerAngleRange[1] && angle < boundingBox.outerAngleRange[0])
        )
    }

    public static isBeyond(point: GeometryN.PointT, origin: GeometryN.PointT, radius: number){
        const relativePosition = [
            (point[0]-origin[0]),
            (point[1]-origin[1])
        ]

        const pointRadius = Math.sqrt(
            relativePosition[0]**2 + relativePosition[1]**2
        ) 

        return pointRadius > radius
    }
}