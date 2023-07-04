connectToDatabase()
    .then((database) => {
        return getUser(database)
            .then(user => {
                return getUserSettings(user, database)
                    .then(settings => {
                        return enableAccess(user, settings);
                    })
            })
    });

connectToDatabase()
    .then((database) => { getUser(database) })
    .then(user => { getUserSettings(user, database) })
    .then(settings => { enableAccess(user, settings) });

const database = await connectToDatabase();
const user = await getUser(database);
const settings = getUserSettings(user, database);
enableAccess(user, settings);