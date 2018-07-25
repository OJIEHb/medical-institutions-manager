import * as functions from 'firebase-functions'

export const listener = functions.database.ref('/institutions/{id}')
    .onWrite(async (event) => {
        const institutionsRef = event.after.ref.parent;
        let id;

        if (!event.after.exists())
            id = event.before.val().controlledBy;
        else 
            id = event.after.val().id;

        await institutionsRef.once('value').then(async function (snapshot) {
            const institutions = snapshot.val();
            const keys = Object.keys(institutions);
            while (id) {
                const populationSum = keys.reduce((total, key) => {
                    return (institutions[key].controlledBy === id) ? total + institutions[key].totalPopulation : total;
                }, 0);
                await institutionsRef.child(id + '/totalPopulation').set(populationSum + institutions[id].population);
                id = institutions[id].controlledBy;
            }
        });
    })
