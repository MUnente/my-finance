const { selectUser, insertUser } = require('../DAL/userRepository');

module.exports = {
    async login(request, result) {
        const returnedValue = await selectUser(request.body);
        
        if (returnedValue.status == 'error')
            return result.status(500).json({ error: 'Internal error, Please, contact our support team.' });
        
        if (returnedValue.status == 'ok' && !returnedValue.content)
            return result.status(404).json({ error: 'The user account provided does not exists.' });

        return result.json(returnedValue);
    },

    async register(request, result) {
        const returnedValue = await insertUser(request.body);

        if (returnedValue.content?.code == 23505) // "duplicate key value violates unique constraint"
            return result.status(409).json({ error: 'The user email provided already exists.' });

        if (returnedValue.content?.severity == 'ERROR') // other type of database error
            return result.status(500).json({ error: 'Internal error, Please, contact our support team.' });
        
        if (returnedValue.status == 'error') // other type of error, such as javascript exception 
            return result.status(500).json({ error: 'Internal error, Please, contact our support team.' });

        return result.json(returnedValue);
    }
};