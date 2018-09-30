import { Institution } from "../../../models/institution";

export function getHospitalTemplate(institution: Institution): any {
	return [
		{
			label: "Місце розташування",
			value: institution.place || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Рівень підпорядкування",
			value: institution.subordinationLevel || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Тип населеного пункту місця розташування",
			value: institution.placeType || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Адреса",
			value: institution.fullAddress || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Кількість населення, яке офіційно зареєстровано на території обслуговування закладу (постійне на 01.01)",
			value: institution.totalPopulation || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Кількість населення, яке офіційно зареєстровано в населеному пункті",
			value: institution.population || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Email установи",
			value: institution.email || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Контактний телефон закладу",
			value: institution.phone || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Факс",
			value: institution.fax || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Сайт в Internet",
			value: institution.site || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Статус юридичної особи",
			value: institution.legalStatus ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Код ЄДРПОУ",
			value: institution.stateRegisterCode || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Код КОАТУУ",
			value: institution.classifierObjectCode || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Форма власності",
			value: institution.ownership || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Код організаційно-правової форми (КОПФ)",
			value: institution.legalFormCode || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Приймальне відділення",
			value: institution.receptionOffice ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Телефон приймального відділення",
			value: institution.receptionOfficePhone || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Реєстратура амбулаторно-поліклінічного підрозділу",
			value: institution.registryOffice ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Телефон реєстратури",
			value: institution.registryOfficePhone || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Рівень надання медичної допомоги",
			value: institution.medicalCare || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Планова ємність:",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "кількість ліжок стаціонару",
			value: institution.hospitalBedsNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "амбулаторно-поліклінічного підрозділу",
			value: institution.hospitalCapacity || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Тип закладу",
			value: institution.institutionType || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Види допомоги, які надає ЗОЗ",
			value: institution.medicalAidTypes ? institution.medicalAidTypes.join(", ") : '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Наявність ліцензії",
			value: institution.license ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Номер ліцензії",
			value: institution.license ? institution.licenseNumber || '-' : '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Дата",
			value: institution.license && institution.licenseDate ? new Date(institution.licenseDate).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Термін дії:",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "з",
			value: institution.license && institution.startLicenseValidity ? new Date(institution.startLicenseValidity).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "по",
			value: institution.license && institution.endLicenseValidity ? new Date(institution.endLicenseValidity).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Задекларовані види допомоги",
			value: institution.declaredAssistanceForms || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Акредитаційна категорія",
			value: institution.accreditationCategoryType || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Номер акредитаційної категорії",
			value: institution.accreditationCategoryType === 'наявна' ? institution.accreditationCategoryNumber || '-' : '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Дата останньої акредитації",
			value: institution.accreditationCategoryType === 'наявна' && institution.lastAccreditation ? new Date(institution.lastAccreditation).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Термін дії:",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "з",
			value: institution.accreditationCategoryType === 'наявна' && institution.startAccreditationValidity ? new Date(institution.startAccreditationValidity).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "по",
			value: institution.accreditationCategoryType === 'наявна' && institution.endAccreditationValidity ? new Date(institution.endAccreditationValidity).toLocaleDateString() : '--.--.----',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Ресурси закладу",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Всього посад",
			value: "",
			cellStyle: { font: { bold: true, italic: true }, alignment: { vertical: 'center', horizontal: 'center', wrapText: true } }
		}, {
			label: "Штатні",
			value: institution.totalRegularPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Зайняті",
			value: institution.totalBusyPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Фізичні особи",
			value: institution.totalIndividualsPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Лікарі",
			value: "",
			cellStyle: { font: { bold: true, italic: true }, alignment: { vertical: 'center', horizontal: 'center', wrapText: true } }
		}, {
			label: "Штатні",
			value: institution.regularDoctorNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Зайняті",
			value: institution.busyDoctorNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Фізичні особи",
			value: institution.individualsDoctorNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Середній м/п",
			value: "",
			cellStyle: { font: { bold: true, italic: true }, alignment: { vertical: 'center', horizontal: 'center', wrapText: true } }
		}, {
			label: "Штатні",
			value: institution.middleRegularPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Зайняті",
			value: institution.middleBusyPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Фізичні особи",
			value: institution.middleIndividualsPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Інший персонал",
			value: "",
			cellStyle: { font: { bold: true, italic: true }, alignment: { vertical: 'center', horizontal: 'center', wrapText: true } }
		}, {
			label: "Штатні",
			value: institution.otherRegularPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Зайняті",
			value: institution.otherBusyPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Фізичні особи",
			value: institution.otherIndividualsPersonalNumber || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Характеристика забудови (типовий проект)",
			value: institution.typicalBuilding ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Опалення",
			value: institution.heatingType,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Наявність централізованого холодного водопостачання",
			value: institution.coldWaterSupply ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Наявність централізованого гарячого водопостачання",
			value: institution.hotWaterSupply ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Оснащеність медичним обладнанням та інвентарем",
			value: institution.equipment == 100 ? '100 %' : institution.equipment == 0 ? '0 %' : 'до ' + institution.equipment + ' %',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Забезпеченість медикаментами для надання невідкладної допомоги",
			value: institution.medicamentEquipment == 100 ? '100 %' : institution.medicamentEquipment == 0 ? '0 %' : 'до ' + institution.medicamentEquipment + ' %',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Транспортні засоби (автомобілі)",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Потреба (кількість)",
			value: institution.vehiclesNeed || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Наявність (кількість)",
			value: institution.vehiclesReality || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "В т.ч. на ходу",
			value: institution.vehiclesWay || 0,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Наявність доступу до мережі Internet",
			value: institution.internetSupply ? 'Так' : 'Ні',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Забезпеченість ЗОЗ комп'ютерною технікою",
			value: "",
			cellStyle: { font: { bold: true }, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
			label: "Потреба (кількість)" || 0,
			value: institution.computerEquipmentNeed,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}, {
			label: "Наявність (кількість)" || 0,
			value: institution.computerEquipmentReality,
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
		}
	]
}