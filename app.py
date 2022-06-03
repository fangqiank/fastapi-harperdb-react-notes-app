from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from database import db
from datetime import datetime
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def get_routes():
    return ['/notes', '/notes/<pk>']


@app.get('/notes')
def get_notes():
    notes = db.search_by_value('notesapp', 'notes',  'id', '*', get_attributes=['*'])
    # notes = db.sql('select * from notesapp.notes order by __updatedtime__ desc')
    return notes


@app.get('/notes/{pk}')
def get_note(pk: str):
    notes = db.search_by_hash('notesapp', 'notes', [pk])
    return notes[0]


@app.post('/notes')
def add_note(data=Body()):
    db.insert('notesapp', 'notes', [{"title": data['title'], "body": data['body'],
                                     "updatedAt": json.dumps(datetime.now(), default=str)}])
    notes = db.search_by_value('notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes


@app.put('/notes/{id}')
def update_note(id: str, data = Body()):
    db.update('notesapp', 'notes', [{"id": id, "title": data['title'], "body": data['body'],
                                     "updatedAt":json.dumps(datetime.now(), default=str)}])

    notes = db.search_by_value('notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes


@app.delete('/notes/{id}')
def delete_note(id:str):
    db.delete('notesapp', 'notes', [id])

    notes = db.search_by_value('notesapp', 'notes', 'id', '*', get_attributes=['*'])
    return notes
