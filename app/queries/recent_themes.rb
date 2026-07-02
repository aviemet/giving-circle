class RecentThemes
  LIMIT = 4

  STATUS_PRIORITY = {
    "current" => 0,
    "future" => 1,
    "draft" => 2,
    "past" => 3,
  }.freeze

  def self.for(user:)
    new(user).call
  end

  def initialize(user)
    @user = user
  end

  def call
    themes = @user.circles.includes(:themes).flat_map(&:themes)
    themes.sort_by { |theme| sort_key(theme) }.first(LIMIT)
  end

  private

  def sort_key(theme)
    priority = STATUS_PRIORITY.fetch(theme.status, 99)
    published_sort = theme.published_at ? -theme.published_at.to_i : 0
    updated_sort = -theme.updated_at.to_i

    [priority, published_sort, updated_sort]
  end
end
