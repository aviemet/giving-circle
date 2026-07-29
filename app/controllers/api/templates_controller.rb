class Api::TemplatesController < Api::ApiController
  include FriendlyIdHistory
  historical_slug_redirect_values Template, :slug

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :templates, -> { search(circle.templates.includes_associated) }
  expose(
    :template,
    id: -> { params[:slug] || params[:template_slug] },
    scope: ->(scope){ scope.includes_associated },
    find: ->(id, scope) { scope.friendly.find(id) },
  )

  strong_params :template, permit: [:name, images: [], slides: [
    :slide_index, slide: [
      :id, :name, :order, :data
    ],
  ]]

  # @route POST /api/circles/:circle_slug/templates (api_circle_templates)
  def create
    head :no_content
  end

  # @route PATCH /api/circles/:circle_slug/templates/:slug (api_circle_template)
  # @route PUT /api/circles/:circle_slug/templates/:slug (api_circle_template)
  def update
    template
    head :no_content
  end

  # @route DELETE /api/circles/:circle_slug/templates/:slug (api_circle_template)
  def destroy
    template
    head :no_content
  end
end
