class ThemeOrgsController < ApplicationController
  include Searchable

  expose :orgs, -> { search(Theme.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  # @route GET /themes/:theme_slug/orgs (theme_orgs)
  def index
    paginated_orgs = orgs.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Theme/Orgs/Index", props: {
      orgs: -> { paginated_orgs.render(view: :index) },
      pagination: -> { {
        count: orgs.size,
        **pagination_data(paginated_orgs)
      } },
      theme: -> { theme.render(view: :shallow) },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /themes/:theme_slug/orgs/:slug (theme_org)
  def show
    render inertia: "Theme/Orgs/Show"
  end

  # @route GET /themes/:theme_slug/orgs/new (new_theme_org)
  def new
    render inertia: "Theme/Orgs/New"
  end

  # @route GET /themes/:theme_slug/orgs/:slug/edit (edit_theme_org)
  def edit
    render inertia: "Theme/Orgs/Edit"
  end

  private

  def sortable_fields
    %w(name slug description).freeze
  end

  def org_params
    params.require(:org).permit(:name, :slug, :description)
  end
end
