class Themes::Presentations::SummarySerializer < Presentations::PersistedSerializer
  attribute :slides_count, type: :number do
    presentation.slides.size
  end
end
