module Admin
  class OrgsController < AdminController
    include Searchable

    expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
    expose :orgs, -> { search(circle.themes.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
    expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/orgs (admin_circle_theme_orgs)
    def index
      authorize orgs
      render inertia: "Orgs/Index", props: {
        orgs: -> { orgs.render }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/orgs/:slug (admin_circle_theme_org)
    def show
      authorize org
      render inertia: "Orgs/Show", props: {
        org: -> { org.render }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/orgs/new (new_admin_circle_theme_org)
    def new
      authorize Org.new
      render inertia: "Orgs/New", props: {
        org: Org.new.render
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:theme_slug/orgs/:slug/edit (edit_admin_circle_theme_org)
    def edit
      authorize org
      render inertia: "Orgs/Edit", props: {
        org: org.render
      }
    end

    # @route POST /admin/circles/:circle_slug/themes/:theme_slug/orgs (admin_circle_theme_orgs)
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

    # @route PATCH /admin/circles/:circle_slug/themes/:theme_slug/orgs/:slug (admin_circle_theme_org)
    # @route PUT /admin/circles/:circle_slug/themes/:theme_slug/orgs/:slug (admin_circle_theme_org)
    def update
      authorize org
      if org.update(org_params)
        redirect_to [:admin, circle, theme, org], notice: "Org was successfully updated."
      else
        redirect_to [:edit, :admin, circle, theme, org], inertia: { errors: org.errors }
      end
    end

    # @route DELETE /admin/circles/:circle_slug/themes/:theme_slug/orgs (admin_circle_theme_orgs)
    # @route DELETE /admin/circles/:circle_slug/themes/:theme_slug/orgs/:slug (admin_circle_theme_org)
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
end
