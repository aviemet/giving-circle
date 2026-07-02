class Themes::DashboardSerializer < Themes::PersistedSerializer
  belongs_to :circle, serializer: Circles::OptionsSerializer
end
