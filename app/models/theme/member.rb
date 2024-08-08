class Theme::Member < ActiveType::Object
  attribute :theme_id, :uuid
  attribute :member_id, :uuid
  attribute :funds, :decimal

  belongs_to :theme
  belongs_to :member

  validates :theme_id, presence: true
  validates :member_id, presence: true
  validates :funds, presence: true, numericality: { greater_than_or_equal_to: 0 }

  after_save :update_themes_member

  def initialize(*args)
    ap({ args: })
  end

  def self.find_or_initialize_by(attributes)
    themes_member = ThemesMember.find_or_initialize_by(
      theme_id: attributes[:theme_id],
      member_id: attributes[:member_id],
    )

    new(
      theme_id: themes_member.theme_id,
      member_id: themes_member.member_id,
      funds: themes_member.funds,
    )
  end

  private

  def update_themes_member
    ThemesMember.find_or_initialize_by(
      theme_id: theme_id,
      member_id: member_id,
    ).update(funds: funds)
  end
end
