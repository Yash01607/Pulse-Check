from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core import config

sync_engine = create_engine(str(config.settings.DEFAULT_SQLALCHEMY_SYNC_DATABASE_URI))
session = sessionmaker(sync_engine, expire_on_commit=False, autoflush=False)
