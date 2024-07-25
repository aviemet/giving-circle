class Presentations::ActiveController < ApplicationController
  expose :presentation, id: -> { params[:slug] }, find_by: :slug

  # @route GET /presentations/:presentation_slug/show {param: :presentation_slug} (active_presentation_show)
  def show
    render inertia: "Present/Dashboard", props: {
      presentation: presentation
    }
  end

  # @route GET /presentations/:presentation_slug/settings {param: :presentation_slug} (active_presentation_settings)
  def settings
    render inertia: "Present/Settings"
  end

end
