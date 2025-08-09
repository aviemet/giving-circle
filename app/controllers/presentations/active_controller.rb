class Presentations::ActiveController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :presentations, -> { search(theme.presentations.includes_associated) }
  expose :presentation, id: -> { params[:presentation_slug] || params[:slug] }, scope: -> { theme.presentations.includes_associated }, find_by: :slug

  strong_params :presentation, permit: [:name, :theme_id]

  sortable_fields %w(name theme_id)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin (theme_presentation_controls)
  def index
    authorize presentation

    render inertia: "Presentations/Active/Index", props: {
      presentation: presentation.render(:show)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/overview (theme_presentation_overview)
  def overview
    authorize presentation

    render inertia: "Presentations/Active/Overview", props: {}
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/members (theme_presentation_members)
  def members
    authorize presentation

    render inertia: "Presentations/Active/Members", props: {}
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/messaging (theme_presentation_messaging)
  def messaging
    authorize presentation

    render inertia: "Presentations/Active/Messaging", props: {}
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/admin/settings (theme_presentation_settings)
  def settings
    authorize presentation

    render inertia: "Presentations/Active/Settings", props: {}
  end
end
