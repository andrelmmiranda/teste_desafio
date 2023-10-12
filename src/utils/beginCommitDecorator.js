const { pool } = require('../connection');

const beginCommitDecorator = async (func)=>{
    await pool.query('begin');
    const data = await func;
    await pool.query('commit');
    return data;
}

module.exports = { beginCommitDecorator };