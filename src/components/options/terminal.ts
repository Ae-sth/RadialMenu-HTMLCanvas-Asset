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

    
    
    get handler(){return this._handler}

    
}