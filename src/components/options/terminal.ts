import { GeometryN } from "src/interfaces/geometry"
import { RadialOptionN } from "src/interfaces/option"
import { TransientOption } from "./transient.js"
import { RootOption } from "./root.js"
import Draw from "../../utils/draw.js"
import { RadialMenu } from "../../core/menu.js"
import Option from "./option.js"
import Geometry from "../../utils/geometry.js"
import { HandlerN } from "src/interfaces/handler.js"

export class TerminalOption extends Option implements RadialOptionN.TerminalOptionI {

    private _handler: Function
    private _icon: Function | undefined
    private _handlerType: HandlerN.HandlerT

    constructor(config: RadialOptionN.TerminalOptionConfigT, position: number, parentOption: RootOption | TransientOption){
        
        super(config, position, parentOption)
        
        this._icon = config.icon
        this._handler = config.handler
        this._handlerType = config.handlerType
    }
    
    select(): void {
        this._selected = true
        RadialMenu.action = this._handler
        RadialMenu.actionType = this._handlerType
    }
    
    unselect(): void {
        this._selected = false
        RadialMenu.action = null
        RadialMenu.actionType = null
    }

    get handler(){return this._handler}

    render(){
        Draw.drawRadialMenuButton(
            RadialMenu.scene.context,
            this._boundingBox.origin,
            this._position,
            this._parentOption.config.subOptions!.length,
            this._layer,
            0
        )
        
        let centerButtonPosition =  Geometry.polarToCartesian(
            (this.boundingBox.innerRadius+this.boundingBox.outerRadius)/2,
            (this.boundingBox.innerAngleRange[1]+this.boundingBox.innerAngleRange[0])/2
        )

        let orientation = Math.atan2(...centerButtonPosition.reverse() as GeometryN.PointT)

        centerButtonPosition = centerButtonPosition
            .map((coord, index)=>coord+this.boundingBox.origin[index])

        if(this._icon){
            this._icon(
                RadialMenu.scene.context,
                centerButtonPosition,
                -orientation,
            )
        }
        
        if(this.selected) {
            Draw.drawBoundingBox(
                RadialMenu.scene.context,
                this.boundingBox
            )
        }

    }
    
}