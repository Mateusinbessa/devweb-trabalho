#@Imports
from os import getcwd, path, listdir
from flask_cors import CORS
from flask import (
    request, 
    jsonify,
    Flask, 
)

#@Custom imports
from functions import (
    insertImportIntoIndex, 
    insertRouteIntoIndex, 
    generateController, 
    updateModelName, 
    updateRouteName,
    getAllRoutes,
    generateModel, 
    generateRoute, 
    getModels, 
)

#@API Configs
app = Flask(__name__)
app.json.sort_keys = False
CORS(app)

@app.route('/api/generate', methods=['POST'])
def handlePost():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No JSON data provided'}), 400

    if not data.get('model'):
        return jsonify({'error': 'Missing the property "model" in the JSON!'}), 422

    if not data.get('file'):
        return jsonify({'error': 'Missing the property "file" in the JSON!'}), 422
    
    if not data.get('route'):
        return jsonify({'error': 'Missing the property "route" in the JSON!'}), 422

    try:
        junctionTable = data.get('junctionTable')
        if data.get('junctionTable') == None: junctionTable = ''
        routeName = data.get('route')
        modelName = data.get('model')
        fileName = data.get('file')
        
        generateModel(modelName=modelName, fileName=fileName, junctionTable=junctionTable)
        generateController(modelName=modelName, fileName=fileName)
        generateRoute(modelName=modelName, fileName=fileName)
        insertRouteIntoIndex(modelName=modelName, routeName=routeName)
        insertImportIntoIndex(modelName=modelName)
        
        return jsonify({'message': 'Model generated sucessfully!'}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong!'}), 500

@app.route('/api/all')
def getAll():
    try:
        modelFiles, models = getModels()
        if not modelFiles or not models or len(modelFiles) != len(models):
            raise ValueError("Model files and models length mismatch or empty")

        model_routes = []
        for model in models:
            routes = getAllRoutes(routeName=model)
            model_routes.append(routes)

        model_routes_formatted = []
        for route in model_routes:
            parts = route.split("'")
            if len(parts) < 2:
                raise ValueError(f"Invalid route format: {route}")
            model_routes_formatted.append(parts[1])

        if len(model_routes_formatted) != len(models):
            raise ValueError("Routes formatted and models length mismatch")

        models_formatted = []
        for ix, model in enumerate(models):
            model_obj = {"name": model, "file": modelFiles[ix], "route": model_routes_formatted[ix]}
            models_formatted.append(model_obj)

        response = {
            "data": {
                "models": models_formatted
            },
            "message": "Models listed successfully!"
        }

        return jsonify(response), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong!'}), 500
    
@app.route('/api/models', methods=['PUT'])  
def updateModel():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No JSON data provided'}), 400

    if not data.get('model'):
        return jsonify({'error': 'Missing the property "model" in the JSON!'}), 422

    if not data.get('file'):
        return jsonify({'error': 'Missing the property "file" in the JSON!'}), 422

    try:
        modelName = data.get('model')
        fileName = data.get('file')
        updateModelName(fileName=fileName, modelName=modelName)
        return jsonify({'message': 'Model updated sucessfully!'}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong!!'}), 500

@app.route('/api/routes', methods=['PUT'])
def updateRoute():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No JSON data provided'}), 400

    if not data.get('old_route'):
        return jsonify({'error': 'Missing the property "old_route" in the JSON!'}), 422
    
    if not data.get('new_route'):
        return jsonify({'error': 'Missing the property "new_route" in the JSON!'}), 422

    try:
        oldRoute = data.get('old_route')
        newRoute = data.get('new_route')
        res = updateRouteName(routeName=newRoute, search=oldRoute)
        
        if 'não foi encontrada' in res: 
            return jsonify({ 'message': res }), 422
        else: 
            return jsonify({ 'message': res }), 201
            
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong!'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
