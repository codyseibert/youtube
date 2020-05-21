import requests

baseUrl = "http://sandipbgt.com/theastrologer/api"

def getSigns():
  return requests.get(f"{baseUrl}/sunsigns").json()

def getHoroscope(sign, timeframe):
  return requests.get(f"{baseUrl}/horoscope/{sign}/{timeframe}").json()
