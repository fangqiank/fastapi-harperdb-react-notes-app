import harperdb
from secrets import HARPERDB_URL, HARPERDB_USERNAME, HARPERDB_PASSWORD

# schemaExists = False

db = harperdb.HarperDB(
    url=HARPERDB_URL,
    username=HARPERDB_USERNAME,
    password=HARPERDB_PASSWORD
)

db_wrapper = harperdb.wrappers.HarperDBWrapper(
    url=HARPERDB_URL,
    username=HARPERDB_USERNAME,
    password=HARPERDB_PASSWORD)

for schema in db_wrapper:
    if schema.name == 'notesapp':
        global schemaExists
        schemaExists = True
        break

if not schemaExists:
    notes_schema = db_wrapper.create_schema(f"notesapp")
    notes_schema.create_table(
        name=f"notes",
        hash_attribute='id'
    )

