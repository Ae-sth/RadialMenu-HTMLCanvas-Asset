import { GeometryN } from "src/interfaces/geometry"
import { RadialOptionN } from "src/interfaces/radial-option"
import TerminalOption from "./terminal.js"
import RootOption from "./root.js"
import Draw from "../../utils/draw.js"
import RadialMenu from "../radial-menu.js"
import Option from "./option.js"

export default class TransientOption extends Option implements RadialOptionN.TransientOptionI {
    private _subOptions: (TransientOption | TerminalOption)[]
    constructor(config: RadialOptionN.TransientOptionConfigT, position: number, parentOption: RootOption | TransientOption){
        super(config, position, parentOption)

        this.config = config
        this._subOptions = [] 

        
    }

    buildSubOptions() {
        this._subOptions =this.config.subOptions!
        .map((cfg, index)=>{

            if("handler" in cfg) {
                return new TerminalOption(cfg, index, this).updateGeometry(this.boundingBox.origin)
            } else {
                return new TransientOption(cfg, index, this).buildSubOptions().updateGeometry(this.boundingBox.origin)
            }

        })

        return this
    }

    getSubOptions(){
        return this._subOptions
    }

}