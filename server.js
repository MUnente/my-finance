require('dotenv').config();

const app = require('./src/app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`⚡️ Server listening on http://localhost:${port}`);
});