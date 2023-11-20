module Admin
  class OrgsController < AdminController
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

    # GET /circles/:circle_slug/orgs/new
    def new
      authorize Org.new
      render inertia: "Orgs/New", props: {
        org: Org.new.render
      }
    end

    # GET /circles/:circle_slug/orgs/:slug/edit
    def edit
      authorize org
      render inertia: "Orgs/Edit", props: {
        org: org.render
      }
    end

    # POST /circles/:circle_slug/orgs
    def create
      authorize Org.new
      if org.save
        redirect_to [:admin, org], notice: "Org was successfully created."
      else
        redirect_to [:admin, new_org_path], inertia: { errors: org.errors }
      end
    end

    # PATCH/PUT /circles/:circle_slug/orgs/:slug
    def update
      authorize org
      if org.update(org_params)
        redirect_to [:admin, org], notice: "Org was successfully updated."
      else
        redirect_to [:admin, edit_org_path], inertia: { errors: org.errors }
      end
    end

    # DELETE /circles/:circle_slug/orgs/:slug
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
