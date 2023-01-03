import { GeometryN } from "src/interfaces/geometry";

export default class Icon {
    public static plus(
        context: CanvasRenderingContext2D,
        position: GeometryN.PointT,
        orientation: number,
        size: number= 7
    ) {

         // Save the current canvas state
        context.save();

        // Translate the canvas context to the center of the plus sign
        context.translate(...position);

        // Rotate the canvas context by the specified angle
        context.rotate(orientation);

        context.beginPath();
        context.moveTo(-size / 2, 0);
        context.lineTo(size / 2, 0);
        context.moveTo(0, -size / 2);
        context.lineTo(0, size / 2);
        context.stroke();

        // Restore the canvas state
        context.restore();

    }
}