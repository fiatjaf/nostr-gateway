FROM node:alpine

# Create working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Copy nostr-gateway source into the Docker image
COPY . /usr/src

# Upgrade base image
RUN set -ex && apk --update --no-cache upgrade

# Install all dependencies for canvas
RUN set -ex && apk add --update --no-cache \
    cairo \
    cairo-dev \
    g++ \
    make \
    pango \
    pango-dev \
    pixman-dev \
    pkgconfig \
    python3 \
    py3-pip

RUN npm install

RUN npm run build

# Expost port 3000 for the web UI
EXPOSE 3000

# Run nostr-gateway on container launch
CMD npm run start
