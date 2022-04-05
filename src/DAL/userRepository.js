const connection = require('../config/connection');

module.exports = {
    async selectUser(formFields) {
        const { txtEmailLogin, txtPasswordLogin } = formFields;
        const query = `
            SELECT 
                id_user,
                nm_username,
                em_email
            FROM mf.tb_user 
            WHERE 
                em_email = $1 AND
                mf.fn_criptography(ps_password, false) = $2;`;
        const params = [ txtEmailLogin, txtPasswordLogin ];

        try {
            const data = await connection.query(query, params);

            if (data.status == 'error') 
                throw data.content;

            return data;
        } catch (err) {
            return { status: 'error', content: err };
        }
    },

    async insertUser(formFields) {
        const { txtNameRegister, txtEmailRegister, txtPasswordRegister } = formFields;

        const query = `
            INSERT INTO mf.tb_user (
                nm_username, 
                em_email, 
                ps_password
            ) 
            VALUES ($1, $2, $3) 
            RETURNING id_user, nm_username, em_email;`;
        const params = [ txtNameRegister, txtEmailRegister, txtPasswordRegister ];

        try {
            const data = await connection.query(query, params);

            if (data.status == 'error') 
                throw data.content;

            return data;
        } catch (err) {
            return { status: 'error', content: err };
        }
    }
};