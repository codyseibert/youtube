
names = ["rick", "morty", "jerry", "summer"] # a list 

# for loop - traditional imperative
properNames = [] # an empty list 
for name in names:
    properNames.append(name.capitalize())
print(properNames) #print list

# map(lambda || fn, list of things to act upon)
properNames = map(lambda name: name.capitalize(), names)
print(list(properNames)) # print the list 

# list comprehension
# [expression loop filter]
properNames = [name.capitalize() for name in names]
print(properNames) #print the list