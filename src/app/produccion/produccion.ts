import { Finca } from "../finca/finca";
import { Trabajador } from "../trabajador/trabajador";
import { Vaca } from "../vaca/vaca";

export class Produccion 
{
    id!: number;
    fecha!: string;
    cantidad!: number;
    vaca!:Vaca
    trabajador!:Trabajador
    finca!:Finca
}
