const connection = require('../config/connection');

module.exports = {
    async selectUser(request, result) {
        const { txtEmailLogin, txtPasswordLogin } = request.body;

        const query = 'SELECT id_user, nm_username FROM tb_user WHERE em_email = $1 AND fn_criptography(ps_password, false) = $2;';
        const params = [ txtEmailLogin, txtPasswordLogin ];

        await connection.query(query, params, (err, res) => {
            try {
                if (err) // console.error(err.stack);
                    return result.status(500).json({ error: 'Internal error. Please, contact our support team.' });
            
                if (!res.rows?.[0])
                    return result.status(404).json({ error: 'The user account provided does not exists.' });

                return result.status(200).json({ user: res.rows?.[0] });
            } catch (error) {
                return result.status(500).json({ error: 'Internal error. Please, contact our support team.' });
            }
        });
    },

    async insertUser(request, result) {
        const { txtNameRegister, txtEmailRegister, txtPasswordRegister } = request.body;

        const query = 'INSERT INTO tb_user (nm_username, em_email, ps_password) VALUES ($1, $2, $3) RETURNING id_user;';
        const params = [ txtNameRegister, txtEmailRegister, txtPasswordRegister ];
        
        await connection.query(query, params, (err, res) => {
            if (err) {
                if (err.code === '23505') // duplicate key value violates unique constraint
                    return result.status(409).json({ error: 'The user account provided already exists.' });

                return result.status(500).json({ error: 'Internal error. Please, contact our support team.' });
            }
            
            return result.status(200).json({ user: res.rows[0] });
        });
    }
};