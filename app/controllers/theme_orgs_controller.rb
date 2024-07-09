class ThemeOrgsController < ApplicationController
  include Searchable

  expose :orgs, -> { search(Theme.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_orgs)
  def index
    authorize orgs
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

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/:slug (circle_theme_org)
  def show
    authorize org
    render inertia: "Theme/Orgs/Show", props: {
      org: org.render(view: :show)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/new (new_circle_theme_org)
  def new
    authorize Org.new
    render inertia: "Theme/Orgs/New", props: {
      org: Org.new.render(view: :form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/:slug/edit (edit_circle_theme_org)
  def edit
    authorize org
    render inertia: "Theme/Orgs/Edit", props: {
      org: org.render(view: :edit)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/:org_slug/import (circle_theme_org_import)
  def import
    authorize Org.new

    render inertia: "Theme/Orgs/Import", props: {
      theme: -> { theme.render(view: :shallow) },
      circle: -> { circle.render(view: :share) }
    }
  end

  private

  def sortable_fields
    %w(name slug description).freeze
  end

  def org_params
    params.require(:org).permit(:name, :slug, :description)
  end
end
