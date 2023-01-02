export namespace GeometryN {

    export type PointT = [x: number, y: number]
    export type VectorT = [a: number, b: number]
    export type ShiftT = [x_shift: number, y_shift: number]

    export type ArcT = [A: PointT, B: PointT]
    export type SegmentT = [A: PointT, B: PointT]
    
    export type RadialBoxT = {
        innerRadius: number,
        outerRadius: number,
        innerAngleRange: [number, number],
        outerAngleRange: [number, number],
        origin: PointT
    }

}