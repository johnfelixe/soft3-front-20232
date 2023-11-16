import { Trabajador } from "../trabajador/trabajador"
import { Vaca } from "../vaca/vaca"
import { Vacuna } from "../vacuna/vacuna"


export class Vacunacion 
{
    id!:number
    fecha!:string
    vacuna!:Vacuna
    vaca!:Vaca
    trabajador!:Trabajador

}
