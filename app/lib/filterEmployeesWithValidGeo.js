export const filterEmployeesWithValidGeo = (employees) => {
    return employees.filter(employee => employee.geo && employee.geo.lat != null && employee.geo.lng != null);
}