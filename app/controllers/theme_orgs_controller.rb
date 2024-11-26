class ThemeOrgsController < ApplicationController
  expose :circle, -> { theme.circle }
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :orgs, -> { search(theme.orgs.includes_associated) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug

  strong_params :org, permit: [:name, :ask, :description]

  strong_params :orgs do
    self.map do |org|
      org.permit(%i(name ask description)).to_h
    end
  end

  sortable_fields %w(name slug description)

  # @route GET /:circle_slug/themes/:theme_slug/orgs (theme_orgs)
  def index
    authorize orgs

    paginated_orgs = paginate(orgs, :theme_orgs)

    render inertia: "ThemeOrgs/Index", props: {
      orgs: -> { paginated_orgs.render(:index) },
      pagination: -> { {
        count: orgs.size,
        **pagination_data(paginated_orgs)
      } },
      theme: -> { theme.render(:inertia_share) },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/orgs/:slug (theme_org)
  def show
    authorize org
    render inertia: "ThemeOrgs/Show", props: {
      org: org.render(:show),
      theme: theme.render(:inertia_share),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/orgs/new (new_theme_org)
  def new
    authorize Org.new
    render inertia: "ThemeOrgs/New", props: {
      org: Org.new.render(:form_data),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/orgs/:slug/edit (edit_theme_org)
  def edit
    authorize org
    render inertia: "ThemeOrgs/Edit", props: {
      org: org.render(:edit),
      theme: theme.render(:inertia_share),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/orgs/:org_slug/import (theme_org_import)
  def import
    authorize Org.new

    render inertia: "ThemeOrgs/Import", props: {
      theme: -> { theme.render(:inertia_share) },
      circle: -> { circle.render(:persisted) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/orgs (theme_orgs)
  def create
    authorize Org.new

    org = find_or_create_by(org_params)
    org.themes << theme

    if org.save
      redirect_to theme_org_path(params[:circle_slug], params[:theme_slug], org), notice: t('theme_orgs.notices.created')
    else
      redirect_to new_theme_org_path(params[:circle_slug], params[:theme_slug]), inertia: { errors: org.errors }
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

end
