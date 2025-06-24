# polimi-gis
PoliMi GIS course project 2025 group 22

## Project creation and libraries
Project is developed with `npm version 10.8.2` and `node version 18.20.8`. Other versions (if not much older) are most likely also compatible.

Project is created by executing the command:
```
npx create-ol-app polimi-gis --template vite
```

The following HTML template was also used: [https://html5up.net/arcana](https://html5up.net/arcana)

## Install and run project (for developers)
To install and run the project in your system, clone the repository in your local environment and execute the commands below:
```
cd polimi-gis
npm install
npm start
```

### Structure
The following files are important:
- [index.html](index.html): the main page of the project
- [pages/results.html](pages/results.html): page that describes the processing steps and the results obtained
- [pages/webgis.html](pages/webgis.html): the web GIS page of the project
- [assets/js/map.js](assets/js/map.js): contains all the functionalities of the web GIS page
- [assets/css/map-style.css](assets/css/map-style.css): contains CSS for styling the web GIS page

Most of the rest of the files are part of the HTML template and may be only lightly modified.

## Building and publishing the project
TODO