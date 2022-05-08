const { selectUser, insertUser } = require('../DAL/userRepository');

module.exports = {
    async login(req, res) {
        if (!req.body?.txtEmailLogin || !req.body?.txtPasswordLogin)
            return res.status(400).json({ status: 'error', content: 'Body request is invalid.' });

        const returnedValue = await selectUser(req.body);
        
        if (returnedValue.status == 'error')
            return res.status(500).json({ status: 'error', content: 'Internal error. Please, contact our support team.' });
        
        if (returnedValue.status == 'ok' && returnedValue.content.length == 0)
            return res.status(404).json({ status: 'error', content: 'The user account provided does not exists.' });
        
        // create session
        req.session.user = returnedValue?.content?.[0];

        return res.status(200).json({ status: 'ok', content: 'Successful Login' });
    },

    async register(req, res) {
        if (!req.body?.txtNameRegister || !req.body?.txtEmailRegister || !req.body?.txtPasswordRegister)
            return res.status(400).json({ status: 'error', content: 'Body request is invalid.' });

        const returnedValue = await insertUser(req.body);

        if (returnedValue.content?.code == 23505) // "duplicate key value violates unique constraint"
            return res.status(409).json({ status: 'error', content: 'The user email provided already exists.' });

        if (returnedValue.content?.severity == 'ERROR') // other type of database error
            return res.status(500).json({ status: 'error', content: 'Internal error. Please, contact our support team.' });
        
        if (returnedValue.status == 'error') // other type of error, such as javascript exception
            return res.status(500).json({ status: 'error', content: 'Internal error. Please, contact our support team.' });

        // create session
        req.session.user = returnedValue?.content?.[0];

        return res.status(200).json({ status: 'ok', content: 'Successful Login' });
    }
};