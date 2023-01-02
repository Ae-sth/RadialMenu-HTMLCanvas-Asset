import { GeometryN } from "src/interfaces/geometry"
import { RadialOptionN } from "src/interfaces/radial-option"
import TerminalOption from "./terminal.js"
import TransientOption from "./transient.js"
import Interaction from "../../utils/interaction.js"

export default class RootOption implements RadialOptionN.RootOptionI {

    private _parentOption: null
    private _subOptions: (TransientOption | TerminalOption)[]
    private _layer: null

    config: RadialOptionN.RootOptionConfigT
    position: GeometryN.PointT
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
                return new TerminalOption(cfg, index, this).updateGeometry(this.position)
            } else {
                return new TransientOption(cfg, index, this).buildSubOptions().updateGeometry(this.position)
            }

        })

        return this
    }

    getSubOptions(){
        return this._subOptions
    }

    get layer(){
        return this._layer
    }
    
    process(eventPosition: GeometryN.PointT){
        for(const option of this._subOptions){
            const hit = Interaction.isWithin(eventPosition, option.boundingBox)
            if(Interaction.isWithin(eventPosition, option.boundingBox)){

                option.select()
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