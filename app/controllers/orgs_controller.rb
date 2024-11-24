class OrgsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :orgs, -> { search(circle.orgs.includes_associated) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug

  strong_params :org, permit: [:name, :slug, :description]

  sortable_fields %w(name slug description themes_org.ask)

  # @route GET /:circle_slug/orgs (circle_orgs)
  def index
    authorize orgs

    paginated_orgs = paginate(orgs, :orgs)

    render inertia: "Orgs/Index", props: {
      orgs: -> { paginated_orgs.render(:index) },
      pagination: -> { {
        count: orgs.size,
        **pagination_data(paginated_orgs)
      } },
    }
  end

  # @route GET /:circle_slug/orgs/:slug (org)
  def show
    authorize org

    render inertia: "Orgs/Show", props: {
      org: -> { org.render(:show) },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /:circle_slug/orgs/:org_slug/about (org_about)
  def about
    authorize org

    render inertia: "Orgs/About", props: {
      org: -> { org.render(:show) },
      themes: -> { org.themes.render(:show) },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /:circle_slug/orgs/new (new_circle_org)
  def new
    authorize Org.new

    render inertia: "Orgs/New", props: {
      org: Org.new.render(:form_data),
    }
  end

  # @route GET /:circle_slug/orgs/:slug/edit (edit_org)
  def edit
    authorize org

    render inertia: "Orgs/Edit", props: {
      org: org.render(:edit),
    }
  end

  # @route POST /:circle_slug/orgs (circle_orgs)
  def create
    authorize Org.new

    org.circle = circle

    if org.save
      redirect_to org_path(params[:circle_slug], org), notice: t('orgs.notices.created')
    else
      redirect_to new_circle_org_path(params[:circle_slug]), inertia: { errors: org.errors }
    end
  end

  # @route PATCH /:circle_slug/orgs/:slug (org)
  # @route PUT /:circle_slug/orgs/:slug (org)
  def update
    authorize org

    if org.update(org_params)
      redirect_to org_path(params[:circle_slug], org), notice: t('orgs.notices.updated')
    else
      redirect_to edit_org_path(params[:circle_slug], org), inertia: { errors: org.errors }
    end
  end

  # @route DELETE /orgs (orgs)
  # @route DELETE /:circle_slug/orgs/:slug (org)
  def destroy
    authorize org

    org.destroy!
    redirect_to circle_orgs_path(params[:circle_slug]), notice: t('orgs.notices.destroyed')
  end
end
