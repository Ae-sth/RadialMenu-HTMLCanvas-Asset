import { RadialOptionN } from "src/interfaces/radial-option"
import TerminalOption from "./terminal.js"
import RootOption from "./root.js"
import Option from "./option.js"
import Draw from "../../utils/draw.js"
import RadialMenu from "../radial-menu.js"
import { GeometryN } from "src/interfaces/geometry.js"
import Interaction from "../../utils/interaction.js"
import Geometry from "../../utils/geometry.js"

export default class TransientOption extends Option implements RadialOptionN.TransientOptionI {
    private _subOptions: (TransientOption | TerminalOption)[]
    private _icon: Function | undefined
    constructor(config: RadialOptionN.TransientOptionConfigT, position: number, parentOption: RootOption | TransientOption){
        super(config, position, parentOption)

        this._icon = config.icon
        this.config = config
        this._subOptions = [] 

        
    }

    buildSubOptions() {
        this._subOptions =this.config.subOptions!
        .map((cfg, index)=>{

            if("handler" in cfg) {
                return new TerminalOption(cfg, index+1, this).updateGeometry(this.boundingBox.origin)
            } else {
                return new TransientOption(cfg, index+1, this).updateGeometry(this.boundingBox.origin).buildSubOptions()
            }

        })

        return this
    }

    process(eventPosition: GeometryN.PointT){
        for(const option of this._subOptions){
            if(Interaction.isWithin(eventPosition, option.boundingBox, 0)){
                option.select()
            } else  if(Interaction.isBeyond(eventPosition, option.boundingBox.origin, option.boundingBox.outerRadius)) {
                if("handler" in option){} else {
                    option.process(eventPosition)
                }
            } else {
                if(option.selected) option.unselect()
            }
        }
    }

    render(){

        Draw.drawRadialMenuButton(
            RadialMenu.context,
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
                RadialMenu.context,
                centerButtonPosition,
                orientation,
            )
        }
        
        if(this.selected) {
            Draw.drawBoundingBox(
                RadialMenu.context,
                this.boundingBox
            )


            for(const option of this._subOptions){
                option.render()
            }
        }

    }

}