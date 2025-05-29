# app.py
from flask import Flask, request, jsonify
from neo4j import GraphDatabase

# Configuración para Neo4j Aura
URI = "neo4j+s://09dc7c39.databases.neo4j.io"
AUTH = ("neo4j", "kAh58yFFN4BpxNxLMeC5X6Qs2Uj08O3-FyYRoWgR5xU")  # <-- Reemplaza "TU_PASSWORD_AQUI" por tu contraseña real

app = Flask(__name__)
driver = GraphDatabase.driver(URI, auth=AUTH)

# Verifica conectividad
try:
    driver.verify_connectivity()
    print("✅ Conexión a Neo4j exitosa")
except Exception as e:
    print("❌ Error de conexión:", e)

@app.route('/')
def index():
    return "🧩 API de Rompecabezas usando Neo4j Aura"

# 1. Crear Puzzle
@app.route('/puzzle', methods=['POST'])
def crear_puzzle():
    data = request.json
    query = """
    MERGE (p:Puzzle {name: $name})
    SET p.type = $type, p.theme = $theme
    RETURN p
    """
    with driver.session() as session:
        session.run(query, name=data['name'], type=data['type'], theme=data['theme'])
    return jsonify({"mensaje": "Puzzle creado"})

# 2. Crear Pieza
@app.route('/pieza', methods=['POST'])
def crear_pieza():
    data = request.json
    query = """
    MATCH (p:Puzzle {name: $puzzle_name})
    CREATE (piece:Piece {label: $label})
    MERGE (piece)-[:PERTENECE]->(p)
    """
    with driver.session() as session:
        session.run(query, puzzle_name=data['puzzle'], label=data['label'])
    return jsonify({"mensaje": "Pieza creada y vinculada al puzzle"})

# 3. Relacionar Piezas
@app.route('/match', methods=['POST'])
def relacionar_piezas():
    data = request.json
    query = """
    MATCH (a:Piece {label: $from}), (b:Piece {label: $to})
    MERGE (a)-[:MATCHES {
        sidefrom: $sidefrom,
        sideto: $sideto,
        comment: $comment
    }]->(b)
    """
    with driver.session() as session:
        session.run(query, **data)
    return jsonify({"mensaje": "Relación MATCHES creada entre piezas"})

# 4. Obtener Piezas de un Puzzle
@app.route('/piezas/<nombre_puzzle>', methods=['GET'])
def obtener_piezas(nombre_puzzle):
    query = """
    MATCH (p:Puzzle {name: $nombre})<-[:PERTENECE]-(pieza:Piece)
    RETURN pieza.label AS label
    ORDER BY pieza.label
    """
    with driver.session() as session:
        result = session.run(query, nombre=nombre_puzzle)
        piezas = [r["label"] for r in result]
    return jsonify(piezas)

# 5. Armar Puzzle desde una Pieza
@app.route('/armar/<pieza_inicial>', methods=['GET'])
def armar_puzzle(pieza_inicial):
    query = """
    MATCH path = (inicio:Piece {label: $pieza_inicial})-[:MATCHES*]->(destino)
    RETURN nodes(path) AS piezas
    """
    armado = []
    with driver.session() as session:
        result = session.run(query, pieza_inicial=pieza_inicial)
        for record in result:
            nodo_path = record["piezas"]
            armado.append([nodo["label"] for nodo in nodo_path])
    return jsonify({"recorridos": armado})

if __name__ == '__main__':
    app.run(debug=True)
