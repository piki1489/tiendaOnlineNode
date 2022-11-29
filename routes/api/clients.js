const router = require('express').Router();

const Client = require('../../models/client.model');

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:clientId/product/:productId', async (req, res) => {
    const { clientId, productId } = req.params;



});

router.post('/', async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.json(newClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;

    try {
        const editedClient = await Client.findByIdAndUpdate(clientId, req.body, { new: true });
        res.json(editedClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:clientId', async (req, res) => {
    const { clientId } = req.params;

    try {
        const deleteClient = await Client.findByIdAndDelete(clientId);
        res.json(deleteClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



module.exports = router;