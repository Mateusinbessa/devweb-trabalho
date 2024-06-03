from functions import generateModel, generateController, generateRoute, insertRouteIntoIndex, insertImportIntoIndex
from flask import Flask, request, jsonify


#API Configs
app = Flask(__name__)
app.json.sort_keys = False

#Routes
@app.route('/create', methods=['POST'])
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

if __name__ == '__main__':
    app.run()
