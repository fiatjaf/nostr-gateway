# Nostr Gateway

<img src="https://user-images.githubusercontent.com/120996278/225457866-358d4a7e-a44b-44b4-832a-f5bed17cdb8a.png" width="400" alt="Nostr Gateway">

The Nostr Gateway is an effort to pull Nostr data from relays around the nostrsphere into HTML pages for the consumption of the unnostrinitiated. It is built using Node.js and Docker, and is designed to be easy to deploy and run on any machine.

## Usage

The Nostr Gateway provides a simple web interface for viewing Nostr data from relays around the nostrsphere.
To use the interface, simply visit https://nostrexplorer.com in your web browser.

## Developing with Next.js

1. `yarn --ignore-engines`
2. `yarn run dev`

## Deploying

It can be deployed to these places that can run Next.js apps natively, like https://vercel.com/. When deploying on Vercel it's necessary to add the environment variables `LD_LIBRARY_PATH=/vercel/path0/node_modules/canvas/build/Release:/var/task/node_modules/canvas/build/Release` manually because of the `canvas` package.

## Running with Docker

1. Clone the repository to your local machine using the git command line tool or a Git desktop client:
2. Navigate to the repository's root directory:
   ```
   git clone https://github.com/fiatjaf/nostr-gateway.git
   cd nostr-gateway
   ```
3. Edit relays in utils/nostr.js (optional)
4. Build the Docker image for the Nostr Gateway:
   ```
   sudo docker build -t nostr-gateway .
   ```
5. Run the Docker container for the Nostr Gateway:
   ```
   sudo docker run -p 3000:3000 -d nostr-gateway
   ```
6. Verify that the Nostr Gateway is running by visiting http://localhost:3000 in your web browser.

## Contributing

Contributions to the Nostr Gateway are welcome!

If you find a bug, have a feature request, or want to contribute code, please open an issue or pull request on the GitHub repository.
