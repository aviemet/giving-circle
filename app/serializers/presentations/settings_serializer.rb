class Presentations::SettingsSerializer < Oj::Serializer
  include TypesFromSerializers::DSL

  object_as :settings, model: "Presentation::Settings"

  attribute :finalist_count, type: :number do
    settings.finalist_count
  end
end
