
names = ["rick", "morty", "jerry", "summer"]

# for loop - traditional imperative
properNames = []
for name in names:
    properNames.append(name.capitalize())
print(properNames)

# map(lambda || fn, list of things to act upon)
properNames = map(lambda name: name.capitalize(), names)
print(list(properNames))

# list comprehension
# [expression loop filter]
properNames = [name.capitalize() for name in names]
print(properNames)