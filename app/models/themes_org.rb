class ThemesOrg < ApplicationRecord
  belongs_to :theme
  belongs_to :org

  scope :includes_associated, -> { includes([:theme, :org]) }
end
