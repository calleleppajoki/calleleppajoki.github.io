# Create Container named boll, with volume.
docker run --name "boll" -dit -v ${pwd}:/usr/src/workspace webappen /bin/sh
# -v "$(pwd)":/usr/src/workspace