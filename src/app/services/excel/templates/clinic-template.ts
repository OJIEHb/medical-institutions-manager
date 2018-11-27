import { Institution } from "../../../models/institution";

export function getClinicTemplate(institution: Institution): any {
	return [
		{
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
			label: "Рівень надання медичної допомоги",
			value: institution.medicalCare || '-',
			cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'left', wrapText: true } }
		}, {
      label: "Технічний стан забудови станом на 31.12",
      value: institution.technicalCondition || '-',
      cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
    }, {
      label: "Загальна площа стаціонару",
      value: institution.totalHospitalArea || 0,
      cellStyle: { font: {}, alignment: { vertical: 'center', horizontal: 'right', wrapText: true } }
    }, {
      label: "Загальна площа амбулаторії",
      value: institution.totalAmbulanceArea || 0,
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
			value: institution.heatingType || '-',
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
