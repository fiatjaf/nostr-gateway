# Nostr Gateway

<img src="https://user-images.githubusercontent.com/120996278/222497757-a8c4c1e7-4ff2-40ca-85f5-e788121f1629.png" width="300" alt="Nostr Gateway">



The Nostr Gateway is an effort to pull Nostr data from relays around the nostrsphere into HTML pages for the consumption of the unnostrinitiated. It is built using Node.js and Docker, and is designed to be easy to deploy and run on any machine.

## Requirements

To run the Nostr Gateway, you will need:

- Docker
- Node.js 

## Installation

To install the Nostr Gateway, follow these steps:

- #1 Clone the repository to your local machine using the git command line tool or a Git desktop client:
   `git clone https://github.com/fiatjaf/nostr-gateway.git`

- #2 Navigate to the repository's root directory:
   `cd nostr-gateway`

- #3 Edit relays in utils/nostr.js (optional)

- #4 Build the Docker image for the Nostr Gateway:
   `sudo docker build -t nostr-gateway .`

- #5 Run the Docker container for the Nostr Gateway:
   `sudo docker run -p 3000:3000 -d nostr-gateway`

- #6 Verify that the Nostr Gateway is running by visiting http://localhost:3000 in your web browser.

## Usage

The Nostr Gateway provides a simple web interface for viewing Nostr data from relays around the nostrsphere. 
To use the interface, simply visit https://www.nostr.guru/ or https://nostr-gateway.vercel.app/ in your web browser.

## Contributing

Contributions to the Nostr Gateway are welcome! If you find a bug, have a feature request, or want to contribute code, please open an issue or pull request on the GitHub repository. 

