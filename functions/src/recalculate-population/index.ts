import * as functions from 'firebase-functions'

const path = '/institutions/{id}';
const resourcesFields = ['regularDoctorNumber', 'busyDoctorNumber', 'individualsDoctorNumber', 'middleRegularPersonalNumber', 'middleBusyPersonalNumber', 'middleIndividualsPersonalNumber', 'otherRegularPersonalNumber', 'otherBusyPersonalNumber', 'otherIndividualsPersonalNumber', 'totalRegularPersonalNumber', 'totalBusyPersonalNumber', 'totalIndividualsPersonalNumber'];

export const onWrite = functions.database.ref(path)
    .onWrite(async snapshot => {
        const ref = snapshot.after.ref.parent;
        const institution = snapshot.after.exists() ? snapshot.after.val() : snapshot.before.val();
        const institutions = await getAll(ref);

        if (snapshot.after.exists())
            await updatePopulation(ref, institution.id, institutions);

        if (institution.type < 4 && institution.type > 1)
            await updateResources(ref, institution, institutions);

        if (institution.controlledBy)
            await updatePopulation(ref, institution.controlledBy, institutions);
    });

async function updatePopulation(ref, id, institutions) {
    const institution = institutions.find(i => i.id === id);
    if (institution) {
        const population = institution.totalPopulation;
        calculateInstitutionPopulation(institution, institutions);
        if (institution.totalPopulation !== population)
            await updateInstitution(ref, institution.id, { totalPopulation: institution.totalPopulation });
    }
}

function calculateInstitutionPopulation(institution, institutions) {
    const childPopulation = institutions.reduce((total, childInstitution) => {
        const isControlled = childInstitution.controlledBy === institution.id;
        return isControlled ? childInstitution.totalPopulation + total : total;
    }, 0);
    institution.totalPopulation = childPopulation + institution.population || 0;
}

async function updateInstitution(ref, id, institution) {
    await ref.child(id).update(institution);
}

async function getAll(ref) {
    return await ref.once('value')
        .then(snapshot => Object.keys(snapshot.val()).map(key => snapshot.val()[key]));
}

function getHeadControlledBy(institution, institutions) {
    let controlledBy = institution.controlledBy;
    let isExist = controlledBy;
    while (isExist) {
        isExist = institutions.find(i => i.id === controlledBy).controlledBy;
        if (isExist)
            controlledBy = isExist;
    }
    return controlledBy;
}

function getAllChildren(id, institutions) {
    const firstLevelChildren = institutions.filter(i => i.controlledBy === id);
    let children = [];
    firstLevelChildren.forEach(i => {
        children = children.concat(institutions.filter(insititution => insititution.controlledBy === i.id));
    });
    return children.concat(firstLevelChildren);
}

async function updateResources(ref, institution, institutions) {
    const id = getHeadControlledBy(institution, institutions);
    const children = getAllChildren(id, institutions);
    const resources = children.reduce((res, i) => {
        resourcesFields.forEach(field => {
            if (!res[field])
                res[field] = i[field] || 0;
            else
                res[field] += i[field] || 0;
        })
        return res;
    }, {});
    await updateInstitution(ref, id, resources || {});
}