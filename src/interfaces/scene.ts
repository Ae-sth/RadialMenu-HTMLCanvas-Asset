import Scene from "example/src/misc/scene";

export namespace SceneN {
    export type SceneT = {
        context: CanvasRenderingContext2D;
        cursor_offset: number;

        argumentSelectionStack: any[]

        bind: (context: CanvasRenderingContext2D)=>void;
        render: ()=>void;

    }
}