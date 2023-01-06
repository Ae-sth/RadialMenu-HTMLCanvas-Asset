import Scene from "src/misc/scene";

export namespace SceneN {
    export type SceneT = {
        context: CanvasRenderingContext2D;
        cursor_offset: number;

        bind: (context: CanvasRenderingContext2D)=>void;
        render: ()=>void;

    }
}