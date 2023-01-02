import { GeometryN } from "src/interfaces/geometry";

export default class Interaction {
    public static isWithin(point: GeometryN.PointT, boundingBox: GeometryN.RadialBoxT){
        
        const relativePosition = [
            (point[0]-boundingBox.origin[0]),
            (point[1]-boundingBox.origin[1])
        ]

        const radius = Math.sqrt(
            relativePosition[0]**2 + relativePosition[1]**2
        )

        const angle = Math.atan2(
            relativePosition[1],
            relativePosition[0]
        )

        return (
            (radius > boundingBox.innerRadius && radius < boundingBox.outerRadius) // radius cond
            && (angle > boundingBox.outerAngleRange[1] && angle < boundingBox.outerAngleRange[0])
        )
    }
}