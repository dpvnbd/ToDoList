class Task < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :priority, presence: true

  enum status: [:in_progress, :completed, :canceled]

  belongs_to :user
end
