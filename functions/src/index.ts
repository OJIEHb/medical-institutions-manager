import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as CalculatePopulation from './recalculate-population'

admin.initializeApp(functions.config().firebase)

export const calculatePopulation = CalculatePopulation.onWrite