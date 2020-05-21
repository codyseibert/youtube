import requests
from api import getSigns, getHoroscope

signs = getSigns()

print("")
timeframe = input(
    "Would you like to receive a horoscope for 'today', 'yesterday', or 'tomorrow'?\n"
)

print("")
print("Here is a list of all the signs you can choose from:")

for sign in signs:
    print(f" - {sign}")

signToFetch = input("\nPlease type a sign to receive your horoscope for today:\n")

horoscope = getHoroscope(signToFetch, timeframe)

print(f"\n\n{horoscope['horoscope']}\n\n")
