# Node Static Site

This project is a simple static website built using HTML, CSS, and JavaScript, with a Node.js backend to serve the static files.

## Project Structure

```
node-static-site
├── public
│   ├── index.html        # Main HTML document
│   ├── styles            # Directory for CSS styles
│   │   └── style.css     # CSS styles for the HTML page
│   └── scripts           # Directory for JavaScript files
│       └── main.js       # JavaScript code for client-side interactivity
├── src
│   └── server.js         # Node.js server setup
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd node-static-site
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the server**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the static site.

## Usage

- Modify the HTML in `public/index.html` to change the content of the site.
- Update styles in `public/styles/style.css` to customize the appearance.
- Add interactivity with JavaScript in `public/scripts/main.js`.
- The server code can be found in `src/server.js`, where you can configure routes and middleware as needed.

## License

This project is licensed under the MIT License.