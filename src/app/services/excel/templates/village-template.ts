import { Institution } from "../../../models/institution";

export function getVillageTemplate(institution: Institution): any {
	return [
		{
			label: "Адреса",
			value: institution.fullAddress || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Кількість населення, яке офіційно зареєстровано в населеному пункті",
			value: institution.population || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Тип закладу",
			value: institution.institutionType || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}
	];
}
