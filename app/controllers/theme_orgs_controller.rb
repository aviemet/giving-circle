class ThemeOrgsController < ApplicationController
  expose :orgs, -> { search(Theme.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_orgs)
  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_org_index)
  def index
    authorize orgs

    paginated_orgs = paginate(orgs, :theme_orgs)

    render inertia: "Themes/Orgs/Index", props: {
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
    render inertia: "Themes/Orgs/Show", props: {
      org: org.render(view: :show)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/new (new_circle_theme_org)
  def new
    authorize Org.new
    render inertia: "Themes/Orgs/New", props: {
      org: Org.new.render(view: :form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/:slug/edit (edit_circle_theme_org)
  def edit
    authorize org
    render inertia: "Themes/Orgs/Edit", props: {
      org: org.render(view: :edit)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/import (circle_theme_orgs_import)
  def import
    authorize Org.new

    render inertia: "Themes/Orgs/Import", props: {
      theme: -> { theme.render(view: :shallow) },
      circle: -> { circle.render(view: :share) }
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_orgs)
  def create
    authorize Org.new

    if params[:org].present?
      create_single_record
    elsif params[:orgs].present?
      create_bulk_records
    else
      render json: { error: 'Invalid parameters' }, status: :unprocessable_entity
    end
  end

  private

  def create_single_record
    org = Org.new(org_params)
    theme = Theme.find_by(slug: params[:theme_slug])

    ActiveRecord::Base.transaction do
      if org.save
        theme.orgs << org
        redirect_to circle_theme_orgs_path(circle.slug, theme.slug), notice: "Org was successfully created."
      else
        redirect_to new_circle_theme_org_path(circle.slug, theme.slug), inertia: { errors: e.message }
      end
    end
  end

  def create_bulk_records
    orgs = orgs_params
    theme = Theme.find_by(slug: params[:theme_slug])

    processed_orgs = orgs.map do |org|
      ask_value = org.delete(:ask)
      org_model = Org.new(org)
      org_model.circle = circle
      org_model.themes_org.build({
        theme_id: theme.id,
        ask: ask_value
      })
      org_model
    end

    imported_orgs = Org.import processed_orgs, :track_validation_failures, recursive: true

    if imported_orgs[:failed_instances].empty?
      redirect_to circle_theme_orgs_path(circle.slug, theme.slug), notice: "Orgs were successfully created."
    else
      redirect_to circle_theme_orgs_import_path(circle.slug, theme.slug), inertia: { errors: '' }
    end
  end

  def sortable_fields
    %w(name slug description).freeze
  end

  def default_strong_params
    %i(name ask description)
  end

  def org_params
    params.require(:org).permit(default_strong_params)
  end

  def orgs_params
    params.require(:orgs).map do |org|
      org.permit(default_strong_params).to_h
    end
  end

end
