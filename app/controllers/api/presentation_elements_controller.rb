class Api::PresentationElementsController < Api::ApiController
  # @route GET /api/presentation_elements/templates (api_presentation_element_templates)
  def templates
    elements = Presentation::Element.templates.order(:name)
    render json: Presentation::Elements::PersistedSerializer.render(elements)
  end
end
