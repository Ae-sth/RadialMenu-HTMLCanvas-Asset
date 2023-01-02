import Draw from "../../utils/draw.js"
import RadialMenu from "../radial-menu.js"
import RootOption from "./root.js"
import TransientOption from "./transient.js"
import { RadialOptionN } from "src/interfaces/radial-option"
import { GeometryN } from "src/interfaces/geometry"
import Geometry from "src/utils/geometry.js"

export default class Option {
    private _label: string
    private _selected: boolean
    private _parentOption: TransientOption | RootOption
    private _boundingBox: GeometryN.RadialBoxT
    private _layer: number
    private _position: number
    config: Partial<RadialOptionN.TransientOptionConfigT & RadialOptionN.TerminalOptionConfigT>
    constructor(config: Partial<RadialOptionN.TransientOptionConfigT & RadialOptionN.TerminalOptionConfigT>, position: number, parentOption: RootOption | TransientOption){

        this.config = config 
        this._label = config.label!
        this._selected = false

        this._position = position

        this._parentOption = parentOption
        this._layer = (parentOption.layer!==null)? parentOption.layer + 1: 0


        this._boundingBox = {
            innerRadius: 0,
            outerRadius: 0,
            innerAngleRange: [0, 0],
            outerAngleRange: [0, 0],
            origin: [0, 0]
        
        }
    }

    get layer(){
        return this._layer
    }
    
    select(){this._selected=true}
    unselect(){this._selected=false}
    get selected(){return this._selected}

    get boundingBox(){
        return this._boundingBox
    }
    
    updateGeometry(origin: GeometryN.PointT){

        
        this._boundingBox = Geometry.radialButtonGeometry(
            origin,
            this._position,
            this._parentOption.config.subOptions!.length,
            this._layer
        )

        return this
    }

    render(){
        Draw.drawRadialMenuButton(
            RadialMenu.context,
            this._boundingBox.origin,
            this._position,
            this._parentOption.config.subOptions!.length,
            this._layer
        )
        
        if(this.selected) Draw.drawBoundingBox(
            RadialMenu.context,
            this.boundingBox
        )

    }
}