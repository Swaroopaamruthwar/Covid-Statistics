const { getConnection } = require('./connection');
const { data } = require('./data');

const refreshAll = async () => {
    try {
        const collection = getConnection();
        await collection.deleteMany({});
        await collection.insertMany(data);
        console.log('Database refreshed successfully!');
    } catch (err) {
        console.log('Error while refreshing database:', err);
    }
};

refreshAll();


