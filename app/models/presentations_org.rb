class PresentationsOrg < ApplicationRecord
  belongs_to :presentation
  belongs_to :org

  scope :includes_associated, -> { includes([:presentation, :org]) }
end
