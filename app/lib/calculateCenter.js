const employees = [
    {
      "name": {
        "first": "John",
        "last": "Doe"
      },
      "email": "johnDoe@example.com",
      "isAdmin": true,
      "contact": {
        "phone": "555-555-5555",
        "address": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "zip": "12345"
        }
      },
      "locationId": null,
      "geo": {
        "lat": 47.6205,
        "lng": -122.3770
      }
    },
    {
      "name": {
        "first": "Jane",
        "last": "Smith"
      },
      "email": "janeSmith@example.com",
      "isAdmin": false,
      "contact": {
        "phone": "555-123-4567",
        "city": "Springfield",
        "state": "NY",
        "zip": "98765"
      },
      "locationId": null,
      "geo": {
        "lat": 47.6129,
        "lng": -122.3376
      }
    },
    {
      "name": {
        "first": "Mike",
        "last": "Lee"
      },
      "email": "mikeLee@example.com",
      "isAdmin": true,
      "contact": {
        "phone": "555-987-6543",
        "address": {
          "street": "456 Elm St",
          "city": "Bayside",
          "state": "CA",
          "zip": "87654"
        }
      },
      "locationId": null,
      "geo": {
        "lat": 47.5606,
        "lng": -122.3081
      }
    },
    {
      "name": {
        "first": "Alice",
        "last": "Johnson"
      },
      "email": "aliceJohnson@example.com",
      "isAdmin": false,
      "contact": {
        "phone": "555-321-0987",
        "address": {
          "street": "789 Maple Ave",
          "city": "Seattle",
          "state": "WA",
          "zip": "09876"
        }
      },
      "locationId": null,
      "geo": {
        "lat": 47.6783,
        "lng": -122.3914
      }
    },
    {
      "name": {
        "first": "David",
        "last": "Williams"
      },
      "email": "davidWilliams@example.com",
      "isAdmin": false,
      "contact": {
        "phone": "555-789-4321",
        "city": "San Jose",
        "state": "CA",
        "zip": "95131"
      },
      "locationId": null,
      "geo": {
        "lat": 47.5262,
        "lng": -122.3521
      }
    }
  ]



// export const averageCenter = function(employees) {
//   const latSum = employees.reduce((sum, employee) => sum + employee.geo.lat, 0);
//   const lngSum = employees.reduce((sum, employee) => sum + employee.geo.lng, 0);
//   const count = employees.length;
//   const latAvg = latSum / count;
//   const lngAvg = lngSum / count;
//   return { lat: latAvg, lng: lngAvg };
// }


// export const averageCenter = function(employees) {


//     employees.reduce(
//         (accumulator, employee) => {
//             accumulator.lat += employee.geo.lat;
//             accumulator.lng += employee.geo.lng;
//             return accumulator;
//         }

//     )

//     // employees.map((employee, index) => (
//     //    console.log(employee.geo.lat)
//     //   ))
// }


export const calculateCenter = (employees) => {
    const latSum = employees.reduce((sum, employee) => sum + employee.geo.lat, 0);
    const lngSum = employees.reduce((sum, employee) => sum + employee.geo.lng, 0);
    const count = employees.length;
    const latAvg = latSum / count;
    const lngAvg = lngSum / count;
    return { lat: latAvg, lng: lngAvg };
  };





