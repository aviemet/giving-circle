class Circles::SettingsSerializer < Oj::Serializer
  include TypesFromSerializers::DSL

  object_as :settings, model: "Circle::Settings"

  attribute :primary_color, type: :string do
    settings.primary_color
  end
end
