# PokeAPI Aeromexico

Este proyecto es una aplicación móvil construida con [Expo](https://expo.dev/) y [React Native](https://reactnative.dev/) que consume la API de [PokeAPI](https://pokeapi.co/). La aplicación está desarrollada utilizando TypeScript y diversas librerías para manejar la navegación, el almacenamiento y las pruebas.

![PokeAPI Aeromexico Screenshot](https://content.instructables.com/FQM/ILK3/IBRRVVZQ/FQMILK3IBRRVVZQ.jpg?auto=webp&frame=1&crop=3:2&width=320&md=MjAxNS0wNy0wNiAxNzowMTozNi4w)

## Tabla de Contenidos

- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Dependencias](#dependencias)
- [Desarrollo](#desarrollo)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/pokeapiaeromexico.git
cd pokeapiaeromexico
```
### 2. Instalar Dependencias

Asegúrate de tener [Node.JS](https://node.js/) y Expo CLI instalados. Luego, ejecuta:

```bash
npm install
```
## Scripts Disponibles
- npm start: Inicia el proyecto en el modo de desarrollo.
- npm run android: Inicia la aplicación en un emulador de Android o dispositivo conectado.
- npm run ios: Inicia la aplicación en un simulador de iOS (requiere macOS y Xcode).
- npm run web: Inicia la aplicación en el navegador.
- npm test: Ejecuta las pruebas utilizando Jest.

## Dependencias

### Dependencias Principales
Estas son las dependencias necesarias para ejecutar la aplicación:

- React: ^18.3.1
- React Native: 0.76.7
- Expo: ~52.0.37
- React Navigation: ^7.0.15
- Async Storage: ^2.1.2
### Dependencias de Desarrollo
Estas son las herramientas utilizadas para el desarrollo y pruebas:

- TypeScript: ^5.3.3
- Jest: ^29.7.0
- Testing Library: ^13.2.0

## Desarrollo
Este proyecto fue iniciado con el template de Expo para TypeScript. Aquí están los pasos básicos que seguí:

### 1. Crear el Proyecto con Expo y TypeScript:

Utiliza Expo CLI para crear un nuevo proyecto con soporte para TypeScript:

```bash
expo init pokeapiaeromexico --template expo-template-blank-typescript
```
### 2. Instalar Librerías de Navegación:

Añade las librerías necesarias para la navegación:
```bash
npm install @react-navigation/native @react-navigation/stack
```

### 3. Instalar Async Storage:

Instala Async Storage para manejar el almacenamiento local:

```bash
npm install @react-native-async-storage/async-storage
```

### 4. Configurar Pruebas con Jest y Testing Library:

Configura Jest y Testing Library para realizar pruebas:

```bash
npm install --save-dev jest jest-expo @testing-library/react-native @testing-library/jest-native
```
### 5. Configurar TypeScript:

Asegúrate de que el archivo tsconfig.json esté configurado adecuadamente para tu proyecto.

### Ejecutar en Expo

```bash
npm estart
```

### Pruebas Test 

```bash
npm test
```






