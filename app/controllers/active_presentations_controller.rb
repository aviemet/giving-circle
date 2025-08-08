class ActivePresentationsController < ApplicationController
  expose :presentation, id: -> { params[:slug] }, find_by: :slug

  # @route GET /active_presentations/:presentation_slug (active_presentation)
  # @route GET /:circle_slug/themes/:theme_slug/active_presentations/:presentation_slug (theme_active_presentation)
  def show
    render inertia: "ActivePresentations/Show", props: {
      presentation: presentation
    }
  end

  # @route GET /active_presentations/:active_presentation_presentation_slug/settings (active_presentation_settings)
  def settings
    render inertia: "ActivePresentations/Settings"
  end

end
