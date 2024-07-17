class OrgsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :orgs, -> { search(circle.themes.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug

  # @route GET /circles/:circle_slug/orgs (circle_orgs)
  def index
    authorize orgs

    paginated_orgs = orgs.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Orgs/Index", props: {
      orgs: -> { paginated_orgs.render(view: :index) },
      pagination: -> { {
        count: orgs.size,
        **pagination_data(paginated_orgs)
      } },
      circle: -> { circle.render(view: :share) },
    }
  end

  # @route GET /circles/:circle_slug/orgs/:slug (circle_org)
  def show
    authorize org

    render inertia: "Orgs/Show", props: {
      org: -> { org.render(view: :show) },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /circles/:circle_slug/orgs/:org_slug/about (circle_org_about)
  def about
    authorize org

    render inertia: "Orgs/About", props: {
      org: -> { org.render(view: :show) },
      themes: -> { org.themes.render(view: :show) },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /circles/:circle_slug/orgs/new (new_circle_org)
  def new
    authorize Org.new

    render inertia: "Orgs/New", props: {
      org: Org.new.render(view: :new),
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route GET /circles/:circle_slug/orgs/:slug/edit (edit_circle_org)
  def edit
    authorize org

    render inertia: "Orgs/Edit", props: {
      org: org.render(view: :edit),
      circle: -> { circle.render(view: :share) }
    }
  end

  def create
    authorize Org.new

    theme = Theme.find_by(slug: params[:theme_slug])

    ActiveRecord::Base.transaction do
      if org.save
        theme.orgs << org # Assuming there's a has_many relationship between Theme and Org
        redirect_to [:admin, circle, theme, org], notice: "Org was successfully created."
      else
        redirect_to [:new, :admin, circle, theme], inertia: { errors: org.errors }
        raise ActiveRecord::Rollback # Rollback the transaction if there's an error
      end
    end
  end

  # @route PATCH /circles/:circle_slug/orgs/:slug (circle_org)
  # @route PUT /circles/:circle_slug/orgs/:slug (circle_org)
  def update
    authorize org

    if org.update(org_params)
      redirect_to [:admin, circle, theme, org], notice: "Org was successfully updated."
    else
      redirect_to [:edit, :admin, circle, theme, org], inertia: { errors: org.errors }
    end
  end

  # @route DELETE /orgs (orgs)
  # @route DELETE /circles/:circle_slug/orgs/:slug (circle_org)
  def destroy
    authorize org

    org.destroy
    redirect_to [:admin, orgs_url], notice: "Org was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name slug description).freeze
  end

  def org_params
    params.require(:org).permit(:name, :slug, :description)
  end
end
