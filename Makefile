default: tools/mapped_connections.csv data.js layout.js

# Map the name of each area in connections.csv to its corresponding index
tools/mapped_connections.csv: tools/connections.csv tools/names.csv
	python process_connections.py

data.js: tools/gendata.js tools/mapped_connections.csv
	node tools/gendata.js

layout.js: tools/layout.svg
	node ../../tools/parse-layout tools/layout.svg > layout.js

