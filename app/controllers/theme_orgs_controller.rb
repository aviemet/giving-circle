class ThemeOrgsController < ApplicationController
  include Searchable

  expose :orgs, -> { search(Theme.find_by(slug: params[:theme_slug]).orgs.includes_associated, sortable_fields) }
  expose :org, id: -> { params[:slug] }, scope: -> { orgs }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_orgs)
  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs (circle_theme_org_index)
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

  # @route GET /circles/:circle_slug/themes/:theme_slug/orgs/import (circle_theme_orgs_import)
  def import
    authorize Org.new

    render inertia: "Theme/Orgs/Import", props: {
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

  def create_single_record
    org = Org.new(org_params)
    theme = Theme.find_by(slug: params[:theme_slug])

    ActiveRecord::Base.transaction do
      if org.save
        theme.orgs << org
        render json: org, status: :created
      else
        render json: org.errors, status: :unprocessable_entity
      end
    end
  end

  def create_bulk_records
    orgs = orgs_params
    theme = Theme.find_by(slug: params[:theme_slug])

    processed_orgs = []
    theme_orgs = []

    orgs.each do |org|
      ask_value = org.delete(:ask)
      processed_orgs << org
      theme_orgs << {
        org_id: org.id,
        theme_id: theme.id,
        ask: ask_value,
      }
    end

    ActiveRecord::Base.transaction do
      Org.insert_all!(orgs)
      ThemesOrg.insert_all!(theme_orgs)

      render json: { message: 'Records created successfully' }, status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end
end
