import os
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

con = connect(host='postgres', dbname='postgres', user=os.environ["POSTGRES_USER"], password=os.environ["POSTGRES_PASSWORD"])

con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = con.cursor()

cur.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'badds'")
exists = cur.fetchone()

if not exists:
    cur.execute('CREATE DATABASE badds')

cur.close()
con.close()
