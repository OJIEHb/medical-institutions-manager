import * as functions from 'firebase-functions'

const path = '/institutions/{id}';

export const onWrite = functions.database.ref(path)
    .onWrite(async snapshot => {
        const ref = snapshot.after.ref.parent;
        const institution = snapshot.after.exists() ? snapshot.after.val() : snapshot.before.val();
        const institutions = await getAll(ref);

        if (snapshot.after.exists())
            await updatePopulation(ref, institution.id, institutions);

        if (institution.controlledBy)
            await updatePopulation(ref, institution.controlledBy, institutions);
    });

async function updatePopulation(ref, id, institutions) {
    const institution = institutions.find(i => i.id === id);
    const population = institution.totalPopulation;
    calculateInstitutionPopulation(institution, institutions);
    if (institution.totalPopulation !== population)
        await savePopulation(ref, institution.id, institution.totalPopulation);
}

function calculateInstitutionPopulation(institution, institutions) {
    const childPopulation = institutions.reduce((total, childInstitution) => {
        const isControlled = childInstitution.controlledBy === institution.id;
        return isControlled ? childInstitution.totalPopulation + total : total;
    }, 0);
    institution.totalPopulation = childPopulation + institution.population || 0;
}

async function savePopulation(ref, id, population) {
    await ref.child(id + '/totalPopulation').set(population);
}

async function getAll(ref) {
    return await ref.once('value')
        .then(snapshot => Object.keys(snapshot.val()).map(key => snapshot.val()[key]));
}
