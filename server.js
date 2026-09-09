const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Primary entry point routes
app.post('/api/v1/payments/process', (req, res) => {
    res.status(200).json({ status: 'Processing payment via Stripe' });
});

app.get('/health', (req, res) => {
    res.status(200).send('Gateway is healthy');
});

app.listen(PORT, () => {
    console.log(`Gateway service running on port ${PORT}`);
});
