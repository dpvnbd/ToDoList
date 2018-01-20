# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.delete_all
Task.create!(id: 1, title: "Some task", description: "Some description", priority: 42, deadline: DateTime.current)
Task.create!(id: 2, title: "Another one", description: "qwerty",
             priority: 0, deadline: DateTime.current + 2.days, status: :completed)

User.delete_all
User.create!(email: "test@test.com", password: "12345678")