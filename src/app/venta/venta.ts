import { Finca } from "../finca/finca"
import { Trabajador } from "../trabajador/trabajador"

export class Venta 
{
    id!:number
    cantidad!:number
    comprador!:string
    fecha!:string
    precio!:number
    finca!:Finca
    trabajador!:Trabajador
}
