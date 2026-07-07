class Api::SpotlightsController < Api::ApiController
  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  expose :orgs, -> { circle.orgs.includes_associated }
  expose :themes, -> { circle.themes.includes_associated }
  expose :memberships, -> { circle.memberships.includes(:person) }
  expose :templates, -> { circle.templates.includes_associated }
  expose :presentations, -> { circle.presentations.includes_associated }

  # @route GET /api/circles/:circle_slug/spotlights (api_circle_spotlights)
  def index
    render json: {
      orgs: Orgs::IndexSerializer.render(orgs),
      themes: Themes::IndexSerializer.render(themes),
      memberships: Memberships::IndexSerializer.render(memberships),
      templates: Templates::IndexSerializer.render(templates),
      presentations: Presentations::IndexSerializer.render(presentations),
    }
  end
end
