import { Finca } from "../finca/finca";
import { User } from '../users/user';

export class Trabajador

{
  id!: number; 
  cedula!: string;
  nombre!: string;
  apellido!: string;
  correo!: string;
  cargo!: string;
  fecha!: string;
  finca!:Finca;
  User!:User;
  

}
