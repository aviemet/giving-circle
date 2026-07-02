class PresentationsController < ApplicationController
  include FriendlyIdHistory
  historical_slug_redirect_values Presentation, :presentation_slug

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :presentations, -> { search(theme.presentations.includes_associated) }
  expose(
    :presentation,
    id: -> { params[:presentation_slug] },
    scope: -> { theme.presentations.includes_associated },
    find_by: :slug,
  )

  strong_params :presentation, permit: [:name, :theme_id, :template_id]

  sortable_fields %w(name theme_id)

  # @route GET /:circle_slug/themes/:theme_slug/presentations (theme_presentations)
  def index
    authorize presentations

    paginated_presentations = paginate(presentations, :presentations)

    render inertia: "Presentations/Index", props: {
      presentations: -> { paginated_presentations.render(:index) },
      pagination: -> { {
        count: presentations.size,
        **pagination_data(paginated_presentations)
      } },
      theme: -> { theme.render(:inertia_share) },
      circle: -> { theme.circle.render(:persisted) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug (theme_presentation)
  def show
    authorize presentation

    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/new (new_theme_presentation)
  def new
    authorize Presentation.new

    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render(:form_data),
      templates: -> { circle.templates.includes_associated.render(:index) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/settings (theme_presentation_settings)
  def settings
    authorize presentation

    render inertia: "Presentations/Settings", props: {
      presentation: presentation.render(:form_data),
    }
  end

  # TODO: I think should be an API endpoint, or at the very least a POST route so it can't just be hit from the browser
  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/activate (theme_presentation_activate)
  def activate
    authorize presentation

    presentation.activate unless presentation.active?

    redirect_to theme_presentation_controls_url(params[:circle_slug], params[:theme_slug], params[:presentation_slug])
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations (theme_presentations)
  def create
    authorize Presentation.new

    presentation.theme = theme

    if presentation.save
      presentation.copy_template_slides if presentation.template_id.present?
      redirect_to theme_presentation_slides_path(params[:circle_slug], params[:theme_slug], presentation), notice: t("presentations.notices.created")
    else
      redirect_to new_theme_presentation_path(params[:circle_slug], params[:theme_slug]), inertia: { errors: presentation.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug (theme_presentation)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug (theme_presentation)
  def update
    authorize presentation

    if presentation.update(presentation_params)
      redirect_to theme_presentation_path(params[:circle_slug], params[:theme_slug], presentation), notice: t("presentations.notices.updated")
    else
      redirect_to theme_presentation_settings_path(params[:circle_slug], params[:theme_slug], presentation), inertia: { errors: presentation.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug (theme_presentation)
  def destroy
    authorize presentation

    presentation.destroy!
    redirect_to theme_presentations_path(params[:circle_slug], params[:theme_slug]), notice: t("presentations.notices.destroyed")
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/save_as_template (theme_presentation_save_as_template)
  def save_as_template
    authorize presentation

    if params[:mode] == "update_source"
      source_template = presentation.template
      if source_template.nil?
        redirect_to theme_presentation_path(params[:circle_slug], params[:theme_slug], presentation), alert: t("presentations.alerts.no_source_template")
        return
      end

      Templates::CopyFromPresentation.call(presentation:, template: source_template)
      redirect_to circle_template_path(params[:circle_slug], source_template), notice: t("presentations.notices.template_updated")
    else
      template = Templates::CopyFromPresentation.call(presentation:, name: params[:name])
      redirect_to circle_template_path(params[:circle_slug], template), notice: t("presentations.notices.template_created")
    end
  end
end
