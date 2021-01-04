# Create Container named boll, with volume.
docker run --name "boll" -p 4200:4200 -dit -v ${pwd}:/usr/src/workspace webappen /bin/sh
# -v "$(pwd)":/usr/src/workspace