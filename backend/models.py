from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    # is_active = Column(Boolean, default=True)
