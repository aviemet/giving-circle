class OrgsController < ApplicationController
  include Searchable

  expose :circle, id: ->{ params[:circle_slug] }, find_by: :slug
  expose :orgs, -> { search(circle.orgs.includes_associated, sortable_fields) }
  expose :org, id: ->{ params[:slug] }, scope: ->{ circle.orgs.includes_associated }, find_by: :slug

  # GET /circles/:circle_slug/orgs
  def index
    authorize orgs
    render inertia: "Orgs/Index", props: {
      orgs: -> { orgs.render }
    }
  end

  # GET /circles/:circle_slug/orgs/:slug
  def show
    authorize org
    render inertia: "Orgs/Show", props: {
      org: -> { org.render }
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
