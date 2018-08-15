export function getHeaders(): Map<string, string> {
    let headers = new Map<string, string>();
    headers.set('fullName', 'Назва');
    headers.set('totalPopulation', 'Населення');
    headers.set('place', 'Місце розташування');
    headers.set('institutionType', 'Тип закладу');
    headers.set('subordinationLevel', 'Рівень підпорядкування');
    headers.set('placeType', 'Тип населеного пункту');
    headers.set('ownership', 'Форма власності');
    headers.set('legalFormCode', 'Код організаційно-правової форми');
    headers.set('receptionOffice', 'Приймальне відділення');
    headers.set('registryOffice', 'Реєстратура');
    headers.set('medicalCare', 'Рівень надання медичної допомоги');
    headers.set('medicalAidTypes', 'Види меддопомоги');
    headers.set('license', 'Наявність ліцензії');
    headers.set('accreditationCategoryType', 'Акредитаційна категорія');
    headers.set('typicalBuilding', 'Типовий проект');
    headers.set('heatingType', 'Опалення');
    headers.set('coldWaterSupply', 'Наявність холодного водопостачання');    
    headers.set('hotWaterSupply', 'Наявність гарячого водопостачання');
    headers.set('equipment', 'Оснащеність медичним обаднанням');
    headers.set('medicamentEquipment', 'Забезпеченість медикаментами');
    headers.set('vehiclesReality', 'Транспортні засоби');
    headers.set('internetSupply', 'Наявність доступу до мережі Інтернет');
    headers.set('computerEquipmentReality', 'Забезпеченість комп\'ютерною технікою');
    headers.set('stateRegisterCode', 'Код ЄДРПОУ');
    headers.set('phone', 'Контактний телефон');
    headers.set('headDoctorName', 'ПІП головного лікаря');
    
    return headers;
}