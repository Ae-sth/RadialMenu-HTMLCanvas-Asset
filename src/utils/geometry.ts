import { GeometryN } from "src/interfaces/geometry"

export default class Geometry {
    public static radialButtonGeometry(
            rootPosition: GeometryN.PointT,
            optionPosition: number,
            optionCount: number,
            optionLayer: number,
            phase: number=optionLayer*Math.PI/5
        ) {

    
            const offset = 5
    
            const innerRadius = 30
            const interiorRadius = 20 + optionLayer*innerRadius + offset/2
            const exteriorRadius = interiorRadius+innerRadius - offset
    
            const numberOfOptions = optionCount
            const angle = (2*Math.PI)/numberOfOptions            
    
            const halfAngleInteriorOffset = (offset/2)/interiorRadius
            const halfAngleExteriorOffset = (offset/2)/exteriorRadius
    

            const interiorAngleRange = [
                optionPosition*angle+phase-halfAngleInteriorOffset,
                (optionPosition-1)*angle+phase+halfAngleInteriorOffset, 
            ] as [number, number] // this
    
            const exteriorAngleRange = [
                optionPosition*angle+phase-halfAngleExteriorOffset, 
                (optionPosition-1)*angle+phase+halfAngleExteriorOffset
            ] as [number, number] // this
    
            return {
                innerRadius: interiorRadius,
                outerRadius: exteriorRadius,
                innerAngleRange: interiorAngleRange,
                outerAngleRange: exteriorAngleRange,
                origin: rootPosition
            }
    }
}