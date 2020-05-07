PORT ?= 8080
DOCKER ?= docker
DOCKER_IMAGE ?= fe-web-login
DOCKER_BUILD_ARGS ?= $(shell env | grep NPM_TOKEN | sed 's/^/--build-arg=/')
SRC = $(shell git ls-files)

.docker-server-image.flag: .docker-builder-image.flag
	$(DOCKER) build $(DOCKER_BUILD_ARGS) -t $(DOCKER_IMAGE) .
	touch $@

.docker-builder-image.flag: Dockerfile $(SRC)
	$(DOCKER) build $(DOCKER_BUILD_ARGS) --target=builder .
	$(DOCKER) build $(DOCKER_BUILD_ARGS) --target=builder --quiet=true . > $@

docker-image: .docker-server-image.flag

serve: .docker-server-image.flag
	$(DOCKER) run --rm --init --publish=$(PORT):8080 $(DOCKER_IMAGE)

test: .docker-builder-image.flag
	$(DOCKER) run --rm --init $(shell cat $<) test:unit

deploy:
	echo 1>&2 TODO

clean:
	rm -f .*.flag

.PHONY: serve test clean docker-image deploy
