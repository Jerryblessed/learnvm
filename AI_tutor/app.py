from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/chat')
def serve_chat():
    return send_from_directory('.', 'chat.html')  # current directory

if __name__ == '__main__':
    app.run(debug=True)
