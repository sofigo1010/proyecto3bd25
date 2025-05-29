# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from neo4j import GraphDatabase

# Configuración para Neo4j Aura
URI = "neo4j+s://09dc7c39.databases.neo4j.io"
AUTH = ("neo4j", "kAh58yFFN4BpxNxLMeC5X6Qs2Uj08O3-FyYRoWgR5xU")

app = Flask(__name__)
CORS(app)  # Habilitar CORS para conectar con el frontend

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
    try:
        data = request.json
        query = """
        MERGE (p:Puzzle {name: $name})
        SET p.type   = $type,
            p.theme  = $theme,
            p.pieces = $pieces
        RETURN p
        """
        params = {
            'name':   data['name'],
            'type':   data.get('type', 'Regular'),
            'theme':  data.get('theme', ''),
            'pieces': data.get('pieces', 0)
        }
        with driver.session() as session:
            session.run(query, **params)
        return jsonify({"mensaje": "Puzzle creado exitosamente", "success": True})
    except Exception as e:
        # Loguea el stack trace en consola y devuelve un mensaje genérico
        app.logger.error("Error en crear_puzzle", exc_info=True)
        return jsonify({"error": "Error interno al crear puzzle", "success": False}), 500

# 2. Crear Pieza
@app.route('/pieza', methods=['POST'])
def crear_pieza():
    try:
        data = request.json
        query = """
        MATCH (p:Puzzle {name: $puzzle_name})
        CREATE (piece:Piece {label: $label})
        MERGE (piece)-[:PERTENECE]->(p)
        RETURN piece
        """
        with driver.session() as session:
            session.run(query, puzzle_name=data['puzzle'], label=data['label'])
        return jsonify({"mensaje": "Pieza creada y vinculada al puzzle", "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

# 3. Relacionar Piezas
@app.route('/match', methods=['POST'])
def relacionar_piezas():
    try:
        data = request.json
        query = """
        MATCH (a:Piece {label: $from}), (b:Piece {label: $to})
        MERGE (a)-[:MATCHES {
            sidefrom: $sidefrom,
            sideto: $sideto,
            comment: $comment
        }]->(b)
        RETURN a, b
        """
        with driver.session() as session:
            result = session.run(query, **data)
            if result.single():
                return jsonify({"mensaje": "Relación MATCHES creada entre piezas", "success": True})
            else:
                return jsonify({"error": "No se encontraron las piezas", "success": False}), 404
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

# 4. Obtener Piezas de un Puzzle
@app.route('/piezas/<nombre_puzzle>', methods=['GET'])
def obtener_piezas(nombre_puzzle):
    try:
        query = """
        MATCH (p:Puzzle {name: $nombre})<-[:PERTENECE]-(pieza:Piece)
        RETURN pieza.label AS label
        ORDER BY pieza.label
        """
        with driver.session() as session:
            result = session.run(query, nombre=nombre_puzzle)
            piezas = [r["label"] for r in result]
        return jsonify({"piezas": piezas, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

# 5. Armar Puzzle desde una Pieza
@app.route('/armar/<pieza_inicial>', methods=['GET'])
def armar_puzzle(pieza_inicial):
    try:
        query = """
        MATCH path = (inicio:Piece {label: $pieza_inicial})-[:MATCHES*0..10]->(destino)
        RETURN [node IN nodes(path) | node.label] AS secuencia,
               length(path) AS longitud
        ORDER BY longitud DESC
        LIMIT 20
        """
        
        armado = []
        with driver.session() as session:
            result = session.run(query, pieza_inicial=pieza_inicial)
            for record in result:
                if record["secuencia"]:
                    armado.append({
                        "secuencia": record["secuencia"],
                        "pasos": len(record["secuencia"]) - 1
                    })
                    
        return jsonify({
            "recorridos": armado, 
            "pieza_inicial": pieza_inicial,
            "total_rutas": len(armado),
            "success": True
        })
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

# 6. Obtener todos los Puzzles
@app.route('/puzzles', methods=['GET'])
def obtener_puzzles():
    try:
        query = """
        MATCH (p:Puzzle)
        RETURN p.name AS name, p.type AS type, p.theme AS theme, p.pieces AS pieces
        ORDER BY p.name
        """
        with driver.session() as session:
            result = session.run(query)
            puzzles = []
            for r in result:
                puzzles.append({
                    "id": len(puzzles) + 1,
                    "name": r["name"], 
                    "type": r["type"] or "Regular", 
                    "theme": r["theme"] or "",
                    "pieces": r["pieces"] or 0
                })
        return jsonify({"puzzles": puzzles, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

# 7. Crear conexiones múltiples
@app.route('/conexiones', methods=['POST'])
def crear_conexiones():
    try:
        data = request.json
        puzzle_name = data['puzzle_name']
        connections = data['connections']
        
        # Primero crear todas las piezas si no existen
        for conn in connections:
            for piece in [conn['from'], conn['to']]:
                query_piece = """
                MATCH (p:Puzzle {name: $puzzle_name})
                MERGE (piece:Piece {label: $label})
                MERGE (piece)-[:PERTENECE]->(p)
                """
                with driver.session() as session:
                    session.run(query_piece, puzzle_name=puzzle_name, label=piece)
        
        # Luego crear las conexiones
        for conn in connections:
            query_match = """
            MATCH (a:Piece {label: $from}), (b:Piece {label: $to})
            MERGE (a)-[:MATCHES {comment: $comment}]->(b)
            """
            with driver.session() as session:
                session.run(query_match, 
                    **{'from': conn['from'], 'to': conn['to'], 'comment': conn.get('comment', '')})
        
        return jsonify({
            "mensaje": f"Se crearon {len(connections)} conexiones",
            "success": True
        })
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)