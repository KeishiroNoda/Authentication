#ライブラリのインポート
import tweepy

# Twitter APIの認証設定
# 取得したキーを格納
api_key = "c7bO3FMzmmcUWgQr0xPNlshgm"
api_secret = "dEJZ4Y5aUDXuAio0F87LN0hVoh5Q7wqtoQ9BFbcVT03pMzOeHh"
access_key = "1586736795613818880-"
access_secret = "OwZEnsCVF1aWyFwnhEBdEHK6i26TNKAbaXJJXM6mnzZhM"

# Tweepy設定
# インスタンスの作成
auth = tweepy.OAuthHandler(api_key, api_secret) # Twitter API認証
auth.set_access_token(access_key, access_secret) # アクセストークン設定
api = tweepy.API(auth) # オブジェクト設定