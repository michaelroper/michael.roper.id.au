TAG?=14-alpine

docker:
	docker build \
		. \
		-t node/node:${TAG} \
		--build-arg TAG=${TAG} \
		--no-cache
npm:
	docker container run \
		--name 11ty \
		--rm \
		-t \
		-p 8080:8080 \
		-p 3001:3001 \
		-v "${CURDIR}":/app \
		node/node:${TAG} \
		$(filter-out $@,$(MAKECMDGOALS))
yarn:
	docker container run \
		--name 11ty \
		--rm \
		-t \
		-p 8080:8080 \
		-p 3001:3001 \
		-v "${CURDIR}":/app \
		node/node:${TAG} \
		$(filter-out $@,$(MAKECMDGOALS))
%:
	@: