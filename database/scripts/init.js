db = db.getSiblingDB('talk-more')

db.plans.insertMany([
  {
    name: 'FaleMais 20',
    minutes: 20,
    price: 15
  },
  {
    name: 'FaleMais 30',
    minutes: 30,
    price: 22.9
  },
  {
    name: 'FaleMais 50',
    minutes: 50,
    price: 40
  },
  {
    name: 'FaleMais 60',
    minutes: 60,
    price: 55
  },
  {
    name: 'FaleMais 80',
    minutes: 80,
    price: 74
  },
  {
    name: 'FaleMais 100',
    minutes: 100,
    price: 80.5
  },
  {
    name: 'FaleMais 120',
    minutes: 120,
    price: 99
  }
])
