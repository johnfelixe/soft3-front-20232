# Ejecutando la aplicación localmente
Este proyecto es generadi con Angular CLI(https://github.com/angular/angular-cli) version 13.2.3.

## Pre-requisitos 

*Editor de código:

Visual Studio Code -https://code.visualstudio.com/
 
*Para instalar Angular en tu sistema local, necesitas lo siguiente:

NodeJS  (Versión LTS) -https://nodejs.org/es/download/

## Instalar la CLI de Angular  versión 13.2.3

Angular CLI - Para la creación y manejo de proyectos en Angular.
Para instalar CLI de Angular, abre una terminal y ejecuta el siguiente comando:

`$ npm install -g @angular/cli@13.2.3`

## Instalar Typescript versión 4.5.5

Para instalar  typescript, abre una terminal y ejecuta el siguiente comando:

`$ npm install -g typescript@4.5.5`


## Verificar instalaciones 

 `$ ng --version`


## Instalar dependencias

Instalar las dependencias en el directorio raíz del proyecto clonado. 

`$ npm install`


## Ejecutar la aplicación

La CLI de Angular incluye un servidor, de modo que puede crear y servir su aplicación localmente.
Navega a la carpeta del espacio de trabajo, como agroEasy
Ejecuta el siguiente comando:

`$ cd agroEasy`

`$ ng serve -o`

El comando ng serve inicia el servidor, observa tus archivos, y reconstruye la aplicación a medida que realizas cambios en esos archivos.

La opción --open (o simplemente-o) abre automáticamente tu navegador en http://localhost:4200/.
