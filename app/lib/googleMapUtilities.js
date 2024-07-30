export const calculateCenter = (employees) => {
    // Filter out employees without geo properties
    const validEmployees = employees.filter(employee => employee.geo && employee.geo.lat != null && employee.geo.lng != null);

    // add up all lat and lng values using reduce
    const latSum = validEmployees.reduce((sum, employee) => sum + employee.geo.lat, 0);
    const lngSum = validEmployees.reduce((sum, employee) => sum + employee.geo.lng, 0);

    // length is the number of valid employees, will be used in the average calculation
    const count = validEmployees.length;

    if (count === 0) {
      return null; // or handle the case when no valid geo properties are found
    }


    // find the average lat and lng values
    const latAvg = latSum / count;
    const lngAvg = latSum / count;

    return { lat: latAvg, lng: lngAvg };
  };



  export const filterEmployeesWithValidGeo = (employees) => {
    return employees.filter(employee => employee.geo && employee.geo.lat != null && employee.geo.lng != null);
}
