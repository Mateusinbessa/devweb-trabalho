from functions import generateModel, generateController, generateRoute, insertRouteIntoIndex, insertImportIntoIndex, getModels, updateModelName, updateRouteName, getSpecificLine
from flask import Flask, request, jsonify
from os import getcwd, path, listdir

#API Configs
app = Flask(__name__)
app.json.sort_keys = False

@app.route('/api/generate', methods=['POST'])
def handlePost():
    # Getting the JSON data
    data = request.get_json()
    
    #If not receive data from JSON
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    # Destructure the JSON data
    modelName = data.get('model')
    fileName = data.get('file')
    junctionTable = data.get('junctionTable')
    routeName = data.get('route')
    
    # Generating the files
    generateModel(modelName=modelName, fileName=fileName, junctionTable=junctionTable)
    generateController(modelName=modelName, fileName=fileName)
    generateRoute(modelName=modelName, fileName=fileName)
    insertRouteIntoIndex(modelName=modelName, routeName=routeName)
    insertImportIntoIndex(modelName=modelName)
    
    # JSON response
    response = {
        "message": "Model generated sucessfully!",
    }
    return jsonify(response), 201

@app.route('/api/all')
def getAll():
    modelFiles, models = getModels()
    response = {
        "models": models,
        "files": modelFiles
    }
    return jsonify(response), 200
    #TODO: FRONTEND VAI RECEBER ISSO, E LISTAR, NA HORA QUE CLICAR PRA ENVIAR VAI ENVIAR O MODELFILE OU CONTROLLERFILES
  
@app.route('/api/models', methods=['PUT'])  
def updateModel():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    fileName = data.get('file')
    modelName = data.get('model')
    
    updateModelName(fileName=fileName, modelName=modelName)
    
    response = {
        "message": "Model updated sucessfully!"
    }
        
    return jsonify(response), 201

@app.route('/api/routes', methods=['PUT'])
def updateRoute():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    oldRoute = data.get('old_route')
    newRoute = data.get('new_route')
    filePath = path.join(getcwd(), "..", "api-base", "index.js")
    line_number, line_content = getSpecificLine(filePath=filePath, string=oldRoute)
    
    if line_number is None:
        return jsonify({"message": f"A rota {oldRoute} não foi encontrada no arquivo!"})
        
    updateRouteName(routeName=newRoute, line=line_number)
    return jsonify({'message': 'Nome da rota atualizado com sucesso!'}), 200
    
if __name__ == '__main__':
    app.run()
