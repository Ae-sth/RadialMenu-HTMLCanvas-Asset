import { GeometryN } from "src/interfaces/geometry"
import { RadialOptionN } from "src/interfaces/radial-option"
import TransientOption from "./transient.js"
import RootOption from "./root.js"
import Draw from "../../utils/draw.js"
import RadialMenu from "../radial-menu.js"
import Option from "./option.js"

export default class TerminalOption extends Option implements RadialOptionN.TerminalOptionI {

    private _handler: Function

    constructor(config: RadialOptionN.TerminalOptionConfigT, position: number, parentOption: RootOption | TransientOption){
        
        super(config, position, parentOption)
        this._handler = config.handler
    }
    
    select(): void {
        this._selected = true
        RadialMenu.action = this._handler 
    }
    
    unselect(): void {
        this._selected = false
        RadialMenu.action = null
    }

    get handler(){return this._handler}

    render(){
        Draw.drawRadialMenuButton(
            RadialMenu.context,
            this._boundingBox.origin,
            this._position,
            this._parentOption.config.subOptions!.length,
            this._layer,
            0
        )
        
        if(this.selected) {
            Draw.drawBoundingBox(
                RadialMenu.context,
                this.boundingBox
            )
        }

    }
    
}