# == Schema Information
#
# Table name: circles
#
#  id         :uuid             not null, primary key
#  mock_data  :boolean          default(FALSE), not null
#  name       :string           not null
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
class MockCircle < Circle
  default_scope { unscoped.where(mock_data: true) }

  before_create :set_mock_data

  has_many :ownerships, foreign_key: "circle_id", dependent: :destroy
  {
    memberships: "Membership",
    themes: "Theme",
    orgs: "Org",
    templates: "Template",
    presentations: "Presentation"
  }.each_pair do |assoc, model|
    has_many assoc, through: :ownerships, source: :ownable, source_type: model
  end

  private

  def set_mock_data
    self.mock_data = true
  end
end
