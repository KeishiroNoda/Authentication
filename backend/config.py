import os


class DevelopmentConfig:

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8mb4'.format(**{
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', 'password'),
        'host': os.getenv('DB_HOST', '[MySQLコンテナのIP]'),
        'database': os.getenv('DB_DATABASE', 'authinfo')
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

Config = DevelopmentConfig