import * as functions from 'firebase-functions'
import { Institution } from '../models/institution';

export const listener = functions.database.ref('/institutions/{id}')
    .onWrite(async (event) => {
        let institution = event.after.val() as Institution;
        let institutionsRef = event.after.ref.parent;

        if (!event.after.exists()) {
            institution = event.before.val() as Institution;
            institutionsRef = event.before.ref.parent;
        }

        await institutionsRef.once('value').then(async function(snapshot) {
            const institutions = [];
            for (let key in snapshot.val()) {
                institutions.push(snapshot.val()[key]);
            }
            let type = institution.type;
            let controlledBy = institution.controlledBy || '';
            while(type > 1) {
                let populationSum = institutions.reduce((totalPopulation, currentInstitution) => {
                    if (currentInstitution.controlledBy && currentInstitution.controlledBy === controlledBy)
                        return totalPopulation + currentInstitution.totalPopulation;
                    return totalPopulation;
                }, 0);
                await institutionsRef.child(controlledBy + '/totalPopulation').set(populationSum + snapshot.val()[controlledBy].population);
                type = snapshot.val()[controlledBy].type;
                controlledBy = snapshot.val()[controlledBy].controlledBy;
            }
          });
    })
