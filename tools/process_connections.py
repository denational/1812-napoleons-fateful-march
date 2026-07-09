import csv

id_space_map = {}

with open("names.csv") as names:
    names_reader = csv.reader(names)
    next(names_reader)
    for row in names_reader:
        id_space_map[row[1]] = row[0]


with open("connections.csv") as connections:
    with open("mapped_connections.csv", "w", newline="") as mapped_connections:
        connections_reader = csv.reader(connections, delimiter=",")
        connections_writer = csv.writer(mapped_connections, delimiter=",")
        next(connections_reader)
        connections_writer.writerow(["id", "space1", "space2", "type", "bridge"]) #header
        for row in connections_reader:
            connections_writer.writerow([row[0], id_space_map[row[1]], id_space_map[row[2]], row[3], row[4]])
            print("Finished connection #" + row[0] + ": " + row[1] + " to " + row[2] + ".")
        print("Done!")
