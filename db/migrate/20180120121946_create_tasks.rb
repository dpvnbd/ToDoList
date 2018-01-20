class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :status, default: 0
      t.integer :priority, default: 0
      t.datetime :deadline

      t.timestamps
    end
  end
end
