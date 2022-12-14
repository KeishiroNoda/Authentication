import tweepy
import threading
from sqlalchemy.orm import Session
import logging
import time
import cruds

# Twitter APIの認証設定
# 取得したキーを格納
api_key = "hEvMEZVDcbZjvVCnx4v1wDifU"
api_secret = "ZUxqVYASpW09FVKjxStTLTduknJG2lVQpaMdOSZeqF8bI5tqgz"
access_key = "1586736795613818880-jOJSORZ9AtWprg1rR3cncP92mgeP4k"
access_secret = "HEy7mhLbd4jua71egooCib7jOgtcZXJbJMr6QirVPlZBo"
# consumer_key = "RmtiWTZrYkFTYnU2bjZOR05DRno6MTpjaQ"
# consumer_secret = "4sXQ4Fnu2dQrHK16hpowN4A8NDHy9RupT3Q3ezGhjrd8hyGBTS"

# Tweepy設定
# インスタンスの作成
auth = tweepy.OAuthHandler(api_key, api_secret) # Twitter API認証
auth.set_access_token(access_key, access_secret) # アクセストークン設定
api = tweepy.API(auth) # オブジェクト設定
            
            
class twitter_thread_case1(threading.Thread):
    dms = []
    interval = 60 
    def __init__(self, db: Session, twitterID, onetimePass):
        threading.Thread.__init__(self)
        self.db = db
        self.alive = True
        self.twitterID = twitterID
        self.onetimePass = onetimePass
        self.status = False
        
    def run(self):
        while self.alive:
            try:
                users = api.search_users(q=self.twitterID)
                dms = api.get_direct_messages()
                for user in users:
                    for dm in dms:
                        if (int(user._json['id']) == int(dm._json['message_create']['sender_id'])):
                            if (str(dm._json['message_create']['message_data']['text']) == str(self.onetimePass)):
                                self.status = True
            except Exception as e:
                logging.exception(e)

            time.sleep(self.interval)  # sleep to wait 60 sec
            print("60sec passed!!")
            
    def kill(self):
        self.alive = False
        self.join()
            
            
class twitter_thread_case2(threading.Thread):
    dms = []
    interval = 60 
    def __init__(self, db: Session):
        threading.Thread.__init__(self)
        self.db = db
        self.alive = True
        
    def run(self):
        while self.alive:
            try:
                dms = api.get_direct_messages()
                self.dms = dms
                for dm in dms:
                    if (str(dm._json['message_create']['message_data']['text']) == "issue"):
                        onetimePass = cruds.get_random_password_string(8)
                        api.send_direct_message(recipient_id=dm._json['message_create']['sender_id'],text=onetimePass)
                        cruds.add_onetime(db=self.db, twitterID=str(dm._json['message_create']['sender_id']), onetimepassword=onetimePass)
                        api.delete_direct_message(id=dm._json['id'])
                        print("Sended DM!")
            except Exception as e:
                logging.exception(e)

            time.sleep(self.interval)  # sleep to wait 60 sec
            print("60sec passed!!")
            
    def kill(self):
        self.alive = False
        self.join()
            

def twitter_case1(twitterID, onetimePass):
    users = api.search_users(q=twitterID)
    dms = api.get_direct_messages()
    print(str(dms[0]._json['message_create']['message_data']['text']))
    for user in users:
        for dm in dms:
            if (int(user._json['id']) == int(dm._json['message_create']['sender_id'])):
                if (str(dm._json['message_create']['message_data']['text']) == str(onetimePass)):
                    return True
    return False
    

def twitter_case2(db, twitter):
    users = api.search_users(q=twitter)
    for user in users:
        return cruds.get_onetime(db=db, twitterID=user._json['id'])
    return 0
    
    
