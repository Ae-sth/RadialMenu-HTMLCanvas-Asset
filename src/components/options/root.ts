import { GeometryN } from "src/interfaces/geometry"
import { RadialOptionN } from "src/interfaces/option"
import { TerminalOption }  from "./terminal.js"
import { TransientOption } from "./transient.js"
import Interaction from "../../utils/interaction.js"

export class RootOption implements RadialOptionN.RootOptionI {

    private _parentOption: null
    private _subOptions: (TransientOption | TerminalOption)[]
    private _layer: null

    public config: RadialOptionN.RootOptionConfigT
    public position: GeometryN.PointT

    constructor(config: RadialOptionN.RootOptionConfigT, position: GeometryN.PointT, parentOption?: TransientOption){
        
        this.config = config
        this.position = position // necessary to build the rest
        this._parentOption = null
        this._layer = null
        this._subOptions = []
        
    }

    buildSubOptions() {
        this._subOptions = this.config.subOptions
        .map((cfg, index)=>{

            if("handler" in cfg) {
                return new TerminalOption(cfg, index+1, this).updateGeometry(this.position)
            } else {
                return new TransientOption(cfg, index+1, this).updateGeometry(this.position).buildSubOptions()
            }

        })

        return this
    }


    get layer(){
        return this._layer
    }
    
    process(eventPosition: GeometryN.PointT){
        for(const option of this._subOptions){
            if(Interaction.isWithin(eventPosition, option.boundingBox, 0)){
                option.select()
            } else if(Interaction.isBeyond(eventPosition, option.boundingBox.origin, option.boundingBox.outerRadius)) {
                if("handler" in option){} else {
                    option.process(eventPosition)
                }
            } else {
                if(option.selected) option.unselect()

            }
        }
    }

    render(){
        for(const option of this._subOptions){
            option.render()
        }
    }
}